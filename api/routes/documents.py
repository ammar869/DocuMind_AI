from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import uuid
import os
import json
from datetime import datetime, timezone
from api.schemas.documents import DocumentDetailsResponse, DocumentSummaryResponse

router = APIRouter(
    tags=["Documents"],
)

UPLOAD_DIR = "data/documents"
INDEX_FILE = os.path.join(UPLOAD_DIR, "index.json")


def load_document_index():
    if not os.path.exists(INDEX_FILE):
        return []

    with open(INDEX_FILE, "r", encoding="utf-8") as index_file:
        return json.load(index_file)


def save_document_index(documents):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    with open(INDEX_FILE, "w", encoding="utf-8") as index_file:
        json.dump(documents, index_file, indent=2)


def create_document_record(document_id: str, filename: str):
    title = os.path.splitext(filename)[0].replace("-", " ").replace("_", " ").title()

    return {
        "document_id": document_id,
        "title": title,
        "filename": filename,
        "uploaded_at": datetime.now(timezone.utc).date().isoformat(),
        "status": "uploaded",
        "page_count": 0,
        "summary": "Uploaded successfully. Processing and extraction will be connected next.",
        "extracted_data": {
            "document_type": "PDF document",
            "author": "Unknown",
            "key_topics": ["Upload", "Processing pending"],
        },
        "text_preview": "Text extraction has not run yet.",
        "citations": [],
    }


@router.get("/documents", response_model=list[DocumentSummaryResponse])
async def list_documents():
    documents = load_document_index()

    return [
        {
            "document_id": document["document_id"],
            "title": document["title"],
            "filename": document["filename"],
            "uploaded_at": document["uploaded_at"],
            "status": document["status"],
            "page_count": document["page_count"],
            "summary": document["summary"],
        }
        for document in documents
    ]


@router.get("/documents/{document_id}", response_model=DocumentDetailsResponse)
async def get_document(document_id: str):
    documents = load_document_index()
    document = next(
        (document for document in documents if document["document_id"] == document_id),
        None,
    )

    if not document:
        raise HTTPException(status_code=404, detail="Document not found")

    return document

@router.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file provided")

    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    document_id = str(uuid.uuid4())

    try:
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        file_path = os.path.join(UPLOAD_DIR, f"{document_id}.pdf")

        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        documents = load_document_index()
        documents.append(create_document_record(document_id, file.filename))
        save_document_index(documents)

        return JSONResponse(
            status_code=200,
            content={
                "document_id": document_id,
                "filename": file.filename,
                "status": "uploaded"
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to save file") from e
