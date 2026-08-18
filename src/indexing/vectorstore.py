from langchain_chroma import Chroma

from src.indexing.embedding import embeddings


vector_store = Chroma(
    collection_name="documind_documents",
    embedding_function=embeddings,
    persist_directory="./data/chroma"
)