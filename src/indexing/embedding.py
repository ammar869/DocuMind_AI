from langchain_huggingface import HuggingFaceEmbeddings


embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

text = "This invoice has a total amount of 3850 dollars."

vector = embeddings.embed_query(text)

print("Vector dimension:", len(vector))
print("First 10 values:", vector[:10])