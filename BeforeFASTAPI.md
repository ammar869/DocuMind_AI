Yes. I’ll make it as your own learning/project notes — simple, practical, and step-by-step, without making it sound like an AI wrote it.

I can’t create the downloadable .md file right now because the file-generation tool is unavailable, but here is the complete Markdown content ready to save as:

DocuMind_AI_Progress.md

# DocuMind AI — My Project Progress


## What am I building?


I am building a document-based question answering system.


The basic idea is:


PDF
↓
Read PDF
↓
Clean text
↓
Understand document
↓
Split into chunks
↓
Create embeddings
↓
Store in ChromaDB
↓
Ask a question
↓
Find relevant chunks
↓
Send them to LLM
↓
Get answer
↓
Show source/page


---


# Phase 1 — Reading the Document


## 1. PDF Loader


File:


`src/document_loader.py`


I used PyMuPDF to read PDF files.


The main function is:


```python
def load_pdf(file_path):

It opens the PDF and goes through every page.

For every page, I save:

{
    "page_number": page_number,
    "text": text
}

So instead of losing the page information, I keep it.

Example:

Page 1 → Invoice information
Page 2 → Terms and conditions
Why?

Because later I want to know where an answer came from.

Phase 2 — LLM Setup
2. Model

File:

src/Model.py

I created the LLM in one separate file.

Something like:

from dotenv import load_dotenv
from langchain_groq import ChatGroq


load_dotenv()


llm = ChatGroq(
    model="..."
)

Then other files can simply use:

from src.Model import llm
Why?

I don't want to create the model again and again in every file.

Phase 3 — Cleaning
3. Text Cleaning

File:

src/processor.py

The text coming from a PDF is not always clean.

There can be:

extra spaces
empty lines
unwanted formatting
broken text

So I created a cleaning step.

The flow is:

Raw PDF text
↓
processor.py
↓
Clean text
Why?

Clean text makes the next steps easier.

Phase 4 — Understanding the Document
4. Document Structuring

File:

src/structurer.py

I created a Pydantic model:

class DocumentInfo(BaseModel):
    document_type: str
    title: str
    important_entities: List[str]
    important_dates: List[str]
    key_information: List[str]

The LLM uses the document text and gives information in this structure.

For example, for an invoice:

document_type → Invoice


title → Invoice


important_entities →
Technova Solutions
Acme Digital Solutions
National Commercial Bank


important_dates →
August 17, 2026
September 1, 2026


key_information →
Invoice number
Total amount
Payment terms
Services
Why?

I don't want every document to be treated as just plain text.

I want to know what kind of document it is and what important information it contains.

Phase 5 — Chunking
5. Splitting the Document

File:

src/indexing/chunker.py

A large document can contain a lot of text.

So I split it into smaller pieces.

I used:

RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=150
)

The document becomes:

Document
│
├── Chunk 1
├── Chunk 2
├── Chunk 3
└── Chunk 4

Each chunk contains information like:

{
    "chunk_id": "1_0",
    "page_number": 1,
    "text": "..."
}
Why?

We don't need to search the entire document every time.

We can search smaller pieces and find the useful ones.

Phase 6 — Embeddings
6. Creating Embeddings

File:

src/indexing/embedding.py

I used:

from langchain_huggingface import HuggingFaceEmbeddings


embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

An embedding converts text into numbers.

For example:

"Total due is $3,850"
        ↓
Embedding model
        ↓
[0.12, -0.42, 0.81, ...]

These numbers represent the meaning of the text.

Why?

Later, when the user asks:

What is the total amount?

we can compare the question with the document chunks.

Phase 7 — Vector Database
7. ChromaDB

File:

src/indexing/vectorstore.py

I used ChromaDB to store:

Text
Embedding
Metadata
ID

The basic idea is:

Chunk
↓
Embedding
↓
ChromaDB

Now the document can be searched based on meaning.

Phase 8 — Metadata
8. Adding Metadata

Each chunk also gets metadata.

For example:

{
    "document_id": document_id,
    "filename": filename,
    "document_type": result.document_type,
    "title": result.title,
    "page_number": chunk["page_number"],
    "chunk_id": chunk["chunk_id"]
}
Why?

Suppose I have:

invoice.pdf
contract.pdf
resume.pdf

If a chunk comes back, I need to know:

Which document?
Which page?
Which chunk?

This is also important for citations.

Phase 9 — Unique Document ID
9. UUID

I added:

import uuid


document_id = str(uuid.uuid4())

This creates a unique ID for the document being processed.

Example:

invoice.pdf
↓
document_id = abc123...

Another document gets another ID.

Important:

uuid.uuid4() does not scan the folder.

It generates one ID when the line runs.

Phase 10 — Unique Chunk IDs
10. Making Chroma IDs Unique

Originally chunks had IDs like:

1_0
1_1
2_0

But another document could have the same IDs.

So I changed the Chroma IDs to:

ids = [
    f"{document_id}_{chunk['chunk_id']}"
    for chunk in chunks
]

Now:

Document A:
A_1_0
A_1_1


Document B:
B_1_0
B_1_1

This prevents ID conflicts.

Phase 11 — Ingestion
11. ingestion.py

File:

src/ingestion.py

I created:

ingest_document(file_path)

This function handles the complete document processing.

The flow is:

PDF
↓
load_pdf()
↓
clean_pages()
↓
structure_document()
↓
chunk_pages()
↓
Create metadata
↓
Create unique IDs
↓
Add to ChromaDB

This is much better than putting all of this code inside main.py.

Phase 12 — Multiple Documents
12. Supporting Multiple PDFs

Instead of using only one PDF path, I used:

glob.glob(
    "C:/Users/Ammar/Documents/DocuMind_AI/data/documents/*.pdf"
)

Now the folder can contain:

documents/
│
├── invoice.pdf
├── contract.pdf
├── resume.pdf
└── policy.pdf

The program can process all of them.

The idea is:

invoice.pdf
      ↓
ingest_document()


contract.pdf
      ↓
ingest_document()


resume.pdf
      ↓
ingest_document()


policy.pdf
      ↓
ingest_document()


          ↓


      ChromaDB
Phase 13 — Retriever
13. Finding Relevant Information

File:

src/rag/retriever.py

Now we move to the question side.

User asks:

What is the total invoice amount?

The retriever searches ChromaDB.

It finds the most relevant chunks.

The basic flow is:

Question
↓
Search ChromaDB
↓
Relevant chunks

We used something like:

retrieve_documents(question, k=3)

k=3 means we want the top 3 relevant chunks.

Phase 14 — Building Context
14. context.py

File:

src/rag/context.py

The retrieved chunks need to be combined before sending them to the LLM.

For example:

Page: 1


Content:
Invoice Number: INV-2026-0087
Total Due: $3,850


---


Page: 2


Content:
Payment is due within 15 days.

This becomes the context.

The basic idea is:

Retrieved chunks
↓
build_context()
↓
Context
Phase 15 — Prompt
15. rag prompt

File:

src/rag/prompt.py

The prompt contains two important things:

Context
+
Question

For example:

Context:
Invoice total is $3,850.


Question:
What is the invoice total?

The LLM uses this information to answer.

Phase 16 — Chains and Runnables
16. LCEL Chain

File:

src/rag/chain.py

At first, the process was written manually:

Retrieve
↓
Build context
↓
Create prompt
↓
Call LLM

Then I converted it into a chain.

I used:

RunnableParallel
RunnablePassthrough
RunnableLambda
StrOutputParser

The chain looks like:

                  Question
                     │
          ┌──────────┴──────────┐
          ↓                     ↓
     Retriever            Passthrough
          ↓                     ↓
      Documents             Question
          ↓
    build_context()
          ↓
        Context
          │                     │
          └──────────┬──────────┘
                     ↓
                   Prompt
                     ↓
                    LLM
                     ↓
              Output Parser
                     ↓
                  Answer
What I learned here

A chain connects different steps together.

For example:

step1 | step2 | step3

means:

step1 output
↓
step2 input
↓
step3 input

RunnableParallel can prepare multiple values at the same time.

RunnablePassthrough allows the original question to continue.

RunnableLambda lets us use our own Python function as a chain step.

Phase 17 — Citations
17. Showing the Source

We didn't want the system to only give:

The invoice total is $3,850.

We also wanted:

Page 1
Chunk 1_0

So we kept the source metadata.

The output can look like:

===== DocuMind =====


The invoice total is $3,850 USD.


===== Sources =====


Page 1 | Chunk 1_0

Now the user knows where the answer came from.

Phase 18 — FastAPI
18. Starting the API

We decided to turn the project into a proper application.

We installed:

uv add fastapi uvicorn python-multipart

Then created:

api.py

The first version contains:

from fastapi import FastAPI


app = FastAPI(
    title="DocuMind AI",
    description="AI Document Intelligence and RAG API",
    version="1.0.0"
)




@app.get("/")
def root():
    return {
        "message": "DocuMind AI is running"
    }




@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

We can run it with:

uv run uvicorn api:app --reload

FastAPI also gives us:

http://127.0.0.1:8000/docs

where we can test our API.

Current Architecture

At this point, the project looks like this:

                         DocuMind AI
                              │
              ┌───────────────┴───────────────┐
              │                               │
        DOCUMENT SIDE                    QUESTION SIDE
              │                               │
              ▼                               ▼
             PDF                           Question
              │                               │
              ▼                               ▼
       document_loader                   Retriever
              │                               │
              ▼                               ▼
          processor                      ChromaDB
              │                               │
              ▼                               ▼
         structurer                     Relevant chunks
              │                               │
              ▼                               ▼
           chunker                         Context
              │                               │
              ▼                               ▼
          embeddings                       Prompt
              │                               │
              ▼                               ▼
          ChromaDB                           LLM
                                              │
                                              ▼
                                       Answer + Sources
What each file does
File	What it does
Model.py	Creates the LLM
document_loader.py	Reads PDF pages
processor.py	Cleans extracted text
structurer.py	Gets useful document information
ingestion.py	Runs the document processing pipeline
chunker.py	Splits text into chunks
embedding.py	Converts text into vectors
vectorstore.py	Connects to ChromaDB
retriever.py	Finds useful chunks
context.py	Builds context
prompt.py	Creates the RAG prompt
chain.py	Connects the RAG steps
api.py	Starts the FastAPI application
main.py	Currently used to run/test the application
The Two Main Pipelines

This is the most important thing to understand.

Document Pipeline

When a document enters:

PDF
 ↓
Extract
 ↓
Clean
 ↓
Structure
 ↓
Chunk
 ↓
Embedding
 ↓
ChromaDB

This is the write/indexing side.

Question Pipeline

When the user asks something:

Question
 ↓
Retriever
 ↓
Relevant chunks
 ↓
Context
 ↓
Prompt
 ↓
LLM
 ↓
Answer
 ↓
Sources

This is the read/query side.

Where I am now

Completed:

PDF loading             ✓
Cleaning                ✓
Document structuring    ✓
Chunking                ✓
Embeddings              ✓
ChromaDB                ✓
Metadata                ✓
Unique document IDs     ✓
Multiple PDFs           ✓
Retriever               ✓
Context building        ✓
RAG prompt              ✓
Chains / Runnables      ✓
Citations               ✓
FastAPI started         ✓
What is left

The next FastAPI work is:

1. Upload PDF
       ↓
2. Send PDF to ingestion.py
       ↓
3. Store it in ChromaDB
       ↓
4. Create /chat endpoint
       ↓
5. Connect /chat to rag_chain
       ↓
6. Return answer + sources as JSON
       ↓
7. Add document listing
       ↓
8. Add document deletion
       ↓
9. Add frontend
       ↓
10. Docker / deployment
The main lesson

The biggest thing I learned from this project is:

RAG is not simply:

PDF → LLM

It is:

Document
↓
Prepare the data
↓
Break it into useful pieces
↓
Convert pieces into searchable vectors
↓
Store them
↓
Search when the user asks something
↓
Give the useful pieces to the LLM
↓
Generate the answer
↓
Show the source

The LLM is only one part of the system.

The document processing, chunking, embeddings, vector search, metadata, retrieval, and API are all important parts too.