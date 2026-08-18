from src.Model import llm
from src.rag.retriever import retrieve_documents
from src.rag.context import build_context
from src.rag.prompt import rag_prompt


def answer_question(question):

    # 1. Retrieve relevant documents
    documents = retrieve_documents(question, k=3)

    # 2. Build context
    context = build_context(documents)

    # 3. Create prompt
    prompt = rag_prompt.invoke({
        "context": context,
        "question": question
    })

    # 4. Ask the LLM
    response = llm.invoke(prompt)

    return response.content