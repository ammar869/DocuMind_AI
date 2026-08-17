# Cleans and normalizes the raw text extracted from the PDF so it is ready for further processing.
from src.document_loader import load_pdf
from src.Model import llm
from src.processor import clean_pages
file_path = "C:/Users/Ammar/Documents/DocuMind_AI/data/documents/sample_professional_invoice.pdf"

pages = load_pdf(file_path)

cleaned_pages = clean_pages(pages)

for page in pages:
    print("PAGE:", page["page_number"])
    print(page["text"])
    print("-" * 50)
