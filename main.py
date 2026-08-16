from src.document_loader import load_pdf

def main():
    print("Hello from documind-ai!")


file_path = "C:/Users/Ammar/Documents/DocuMind_AI/data/documents/sample_professional_invoice.pdf"
pages = load_pdf(file_path)

print(pages)