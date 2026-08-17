from src.document_loader import load_pdf
from src.Model import llm

file_path = "C:/Users/Ammar/Documents/DocuMind_AI/data/documents/sample_professional_invoice.pdf"
pages = load_pdf(file_path)

# for page in pages:
#     print("PAGE:", page["page_number"])
#     print(page["text"])
#     print("-" * 50)


print(pages)