def clean_pages(pages):
    cleaned_pages = []

    for page in pages:
        text = page["text"].strip()

        if not text:
            continue

        cleaned_pages.append({
            "page_number": page["page_number"],
            "text": text
        })

    return cleaned_pages