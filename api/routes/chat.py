from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import os

router = APIRouter(
    tags=["Chat"],
)

class QuestionRequest(BaseModel):
    question: str
    document_id: Optional[str] = None

@router.post("/chat")
async def chat(request: QuestionRequest):
    if not os.getenv("GROQ_API_KEY"):
        return {
            "answer": "Chat endpoint is connected. Add GROQ_API_KEY to enable the RAG pipeline.",
            "sources": [],
            "document_id": request.document_id
        }

    try:
        from src.rag.chain import rag_chain

        result = rag_chain.invoke(request.question)

        return {
            "answer": result["answer"],
            "sources": result["sources"],
            "document_id": request.document_id
        }
    except Exception:
        return {
            "answer": "Chat endpoint is connected, but the RAG pipeline is not ready yet.",
            "sources": [],
            "document_id": request.document_id
        }
