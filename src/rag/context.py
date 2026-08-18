def build_context(documents):

    context_parts = []

    for document in documents:

        context_parts.append(
            f"Page: {document.metadata['page_number']}\n"
            f"Content:\n{document.page_content}"
        )

    return "\n\n---\n\n".join(context_parts)
