from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class Source(BaseModel):
    page_number: int
    chunk_id: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[Source]
    document_id: Optional[str] = None