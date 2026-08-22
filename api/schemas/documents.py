from pydantic import BaseModel
from typing import List

class DocumentResponse(BaseModel):
    document_id: str
    filename: str
    status: str


class DocumentSummaryResponse(BaseModel):
    document_id: str
    title: str
    filename: str
    uploaded_at: str
    status: str
    page_count: int
    summary: str


class ExtractedDataResponse(BaseModel):
    document_type: str
    author: str
    key_topics: List[str]


class DocumentDetailsResponse(DocumentSummaryResponse):
    extracted_data: ExtractedDataResponse
    text_preview: str
    citations: List[str]
