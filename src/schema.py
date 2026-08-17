#schemas.py       = WHAT the output must look like
#structurer.py    = HOW we ask the LLM to produce that output

from pydantic import BaseModel
from typing import List


class DocumentInfo(BaseModel):
    document_type: str
    title: str
    important_entities: List[str]
    important_dates: List[str]
    key_information: List[str]