import fitz
import pymupdf

def load_pdf(file_path):
    document = fitz.open(file_path)
    #print(len(document))
    page = document[0]
    #print(page.get_text())

    #for page in document:
    #    print(page.get_text())
    #   pass

    for page_number, page in enumerate(document, start=1):
        print("PAGE:", page_number)
        print(page.get_text())

    pages = []

    for page_number, page in enumerate(document, start=1):

        text = page.get_text()

        page_data = {
        # page number
        # text
    }

    pages.append(page_data)
