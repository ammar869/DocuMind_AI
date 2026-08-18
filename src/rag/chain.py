# from src.Model import llm
# from src.rag.retriever import retrieve_documents
# from src.rag.context import build_context
# from src.rag.prompt import rag_prompt


# def answer_question(question):

#     # 1. Retrieve relevant documents
#     documents = retrieve_documents(question, k=3)

#     # 2. Build context
#     context = build_context(documents)

#     # 3. Create prompt
#     prompt = rag_prompt.invoke({
#         "context": context,
#         "question": question
#     })

#     # 4. Ask the LLM
#     response = llm.invoke(prompt)

#     return response.content

# from langchain_core.runnables import (
#     RunnableParallel,
#     RunnablePassthrough,
#     RunnableLambda
# )
# from langchain_core.output_parsers import StrOutputParser

# from src.Model import llm
# from src.rag.retriever import retrieve_documents
# from src.rag.context import build_context
# from src.rag.prompt import rag_prompt


# # Retrieve documents
# retriever = RunnableLambda(
#     lambda question: retrieve_documents(question, k=3)
# )


# # RAG chain
# rag_chain = (
#     RunnableParallel(
#         context=retriever | RunnableLambda(build_context),
#         question=RunnablePassthrough()
#     )
#     | rag_prompt
#     | llm
#     | StrOutputParser()
# )
# #                 question
#                 /        \
#                /          \
#               ▼            ▼
#         Retriever       Passthrough
#             ↓               ↓
#         Documents        Question
#             ↓
#       build_context
#             ↓
#          Context
#              \            /
#               \          /
#                ▼        ▼
#                   Prompt


from langchain_core.runnables import (
    RunnableParallel,
    RunnablePassthrough,
    RunnableLambda
)
from langchain_core.output_parsers import StrOutputParser

from src.Model import llm
from src.rag.retriever import retrieve_documents
from src.rag.context import build_context
from src.rag.prompt import rag_prompt


# Retrieve documents
retriever = RunnableLambda(
    lambda question: retrieve_documents(question, k=3)
)


# Get source information
def get_sources(documents):

    sources = []

    for document in documents:

        source = {
            "page_number": document.metadata["page_number"],
            "chunk_id": document.metadata["chunk_id"]
        }

        if source not in sources:
            sources.append(source)

    return sources


# RAG chain
rag_chain = (
    RunnableParallel(
        documents=retriever,
        question=RunnablePassthrough()
    )

    .assign(
        context=RunnableLambda(
            lambda data: build_context(data["documents"])
        )
    )

    .assign(
        answer=(
            RunnableParallel(
                context=lambda data: data["context"],
                question=lambda data: data["question"]
            )
            | rag_prompt
            | llm
            | StrOutputParser()
        )
    )

    .assign(
        sources=RunnableLambda(
            lambda data: get_sources(data["documents"])
        )
    )
)