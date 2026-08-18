from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunk_pages(pages):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150
    )

    chunks = []

    for page in pages:

        page_chunks = splitter.split_text(page["text"])

        for chunk_index, text in enumerate(page_chunks):

            chunks.append({
                "chunk_id": f"{page['page_number']}_{chunk_index}",
                "page_number": page["page_number"],
                "text": text
            })

    return chunks