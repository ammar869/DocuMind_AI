import fitz
import pymupdf
file_path = "C:/Users/Ammar/Documents/DocuMind_AI/data/documents/sample_professional_invoice.pdf"
def load_pdf(file_path):
    document = fitz.open(file_path)
    print(len(document))
    page = document[0]

load_pdf(file_path)