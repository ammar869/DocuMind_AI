from fastapi import APIRouter
from pydantic import BaseModel
from src.rag.chain import rag_chain

router = APIRouter(
    tags=["Chat"],
)

class QuestionRequest(BaseModel):
    question: str
    document_id: str = None

@router.post("/chat")
async def chat(request: QuestionRequest):
    result = rag_chain.invoke(request.question)

    return {
        "answer": result["answer"],
        "sources": result["sources"],
        "document_id": request.document_id
    }