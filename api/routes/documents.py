from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uuid
import os

router = APIRouter(
    tags=["Documents"],
)

UPLOAD_DIR = "data/documents"

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