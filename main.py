# Cleans and normalizes the raw text extracted from the PDF so it is ready for further processing.

from src.document_loader import load_pdf
from src.Model import llm
from src.processor import clean_pages
from src.structurer import structure_document
from src.indexing.chunker import chunk_pages
from src.indexing.embedding import embeddings
from src.indexing.vectorstore import vector_store
from src.rag.chain import rag_chain
import uuid

file_path = "C:/Users/Ammar/Documents/DocuMind_AI/data/documents/sample_professional_invoice.pdf"

document_id = str(uuid.uuid4())



pages = load_pdf(file_path)

cleaned_pages = clean_pages(pages)

result = structure_document(cleaned_pages)


chunks = chunk_pages(cleaned_pages)


texts = [chunk["text"] for chunk in chunks]


metadatas = [
    {
        "document_id": document_id,
        "page_number": chunk["page_number"],
        "chunk_id": chunk["chunk_id"]
    }
    for chunk in chunks
]

ids = [
    f"{document_id}_{chunk['chunk_id']}"
    for chunk in chunks
]


vector_store.add_texts(
    texts=texts,
    metadatas=metadatas,
    ids=ids
)


# That code was only for testing embeddings manually:
# for chunk in chunks:

#     vector = embeddings.embed_query(chunk["text"])

#     chunk["embedding"] = vector

#     print("Chunk:", chunk["chunk_id"])
#     print("Vector dimension:", len(vector))
#     print("-" * 50)


# ........................simple
# for chunk in chunks:
#     print(chunk)
#     print("-" * 50)


#print(result)


# for page in pages:
#     print("PAGE:", page["page_number"])
#     print(page["text"])
#     print("-" * 50)


question = input("Ask something about your document: ")

result = rag_chain.invoke(question)

print("\n===== DocuMind =====")

print(result["answer"])

print("\n===== Sources =====")

for source in result["sources"]:

    print(
        f"📄 Page {source['page_number']} "
        f"| Chunk {source['chunk_id']}"
    )