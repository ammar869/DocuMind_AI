from src.indexing.vectorstore import vector_store


def retrieve_documents(query, k=3):

    results = vector_store.similarity_search(
        query,
        k=k
    )

    return results