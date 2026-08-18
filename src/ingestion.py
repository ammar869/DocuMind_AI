import os
import uuid

from src.document_loader import load_pdf
from src.processor import clean_pages
from src.structurer import structure_document
from src.indexing.chunker import chunk_pages
from src.indexing.vectorstore import vector_store


def ingest_document(file_path):

    document_id = str(uuid.uuid4())

    pages = load_pdf(file_path)

    cleaned_pages = clean_pages(pages)

    result = structure_document(cleaned_pages)

    chunks = chunk_pages(cleaned_pages)

    texts = [
        chunk["text"]
        for chunk in chunks
    ]

    filename = os.path.basename(file_path)

    metadatas = [
        {
            "document_id": document_id,
            "filename": filename,
            "page_number": chunk["page_number"],
            "chunk_id": chunk["chunk_id"]
        }
        for chunk in chunks
    ]

    ids = [
        f"{document_id}_{chunk['chunk_id']}"
        for chunk in chunks
    ]

    vector_store.add_texts(
        texts=texts,
        metadatas=metadatas,
        ids=ids
    )

    return {
        "document_id": document_id,
        "filename": filename,
        "document_type": result.document_type,
        "chunks": len(chunks)
    }