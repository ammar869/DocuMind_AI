from src.Model import llm


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

    response = llm.invoke(prompt)

    return response.content