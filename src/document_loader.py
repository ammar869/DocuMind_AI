import pymupdf


def load_pdf(file_path):
    document = pymupdf.open(file_path)

    pages = []

    for page_number, page in enumerate(document, start=1):
        text = page.get_text()

        page_data = {
            "page_number": page_number,
            "text": text
        }

        pages.append(page_data)

    document.close()

    return pages