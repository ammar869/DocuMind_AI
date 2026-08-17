from src.Model import llm
from src.schema import DocumentInfo
#schemas.py       = WHAT the output must look like
#structurer.py    = HOW we ask the LLM to produce that output

def structure_document(pages):

    document_text = ""

    for page in pages:
        document_text += f"\nPage {page['page_number']}:\n"
        document_text += page["text"]

    prompt = f"""
You are a document analysis assistant.

Analyze the following document and identify:
- document type
- title
- important entities
- important dates
- key information

Document:

{document_text}
"""

    structured_llm = llm.with_structured_output(DocumentInfo)
    response = structured_llm.invoke(prompt)
    return response