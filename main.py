# Cleans and normalizes the raw text extracted from the PDF so it is ready for further processing.

from src.Model import llm
from src.rag.chain import rag_chain
from src.ingestion import ingest_document
import glob


# Find all PDF documents
document_paths = glob.glob(
    "C:/Users/Ammar/Documents/DocuMind_AI/data/documents/*.pdf"
)


# Ingest all documents
for file_path in document_paths:

    document = ingest_document(file_path)

    print("\nDocument indexed successfully.")
    print("Document ID:", document["document_id"])
    print("Filename:", document["filename"])
    print("Chunks:", document["chunks"])


# Ask a question
question = input("Ask something about your document: ")


# Run RAG chain
result = rag_chain.invoke(question)


print("\n===== DocuMind =====")

print(result["answer"])


print("\n===== Sources =====")

for source in result["sources"]:

    print(
        f"📄 Page {source['page_number']} "
        f"| Chunk {source['chunk_id']}"
    )