# DocuMind_AI

                         ┌──────────────────────┐
                         │       USER           │
                         │ PDF / Question       │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────▼────────────────┐
                    │        DOCUMENT INGESTION       │
                    │                                 │
                    │ PDF / DOCX / Images / Scans    │
                    └───────────────┬─────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │      DOCUMENT DETECTION       │
                    │                               │
                    │ Text PDF? Scanned PDF?        │
                    │ Image? Tables?                │
                    └───────────────┬───────────────┘
                                    │
                    ┌───────────────▼────────────────┐
                    │       EXTRACTION LAYER         │
                    │                                │
                    │ PDF Parser                     │
                    │ OCR                            │
                    │ Table Extraction               │
                    │ Layout Extraction              │
                    └───────────────┬────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │       NORMALIZATION            │
                    │                               │
                    │ Clean text                    │
                    │ Remove noise                  │
                    │ Preserve page numbers         │
                    │ Preserve tables               │
                    │ Metadata                      │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │        LLM PROCESSING          │
                    │                               │
                    │ Document classification       │
                    │ Information extraction        │
                    │ Entity extraction             │
                    │ Summarization                 │
                    │ Metadata generation            │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │       DOCUMENT OBJECT          │
                    │                               │
                    │ document_id                   │
                    │ title                         │
                    │ type                          │
                    │ pages                         │
                    │ sections                      │
                    │ metadata                      │
                    │ tables                        │
                    │ entities                      │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │          CHUNKING              │
                    │                               │
                    │ Semantic chunks               │
                    │ Section-aware chunks          │
                    │ Table chunks                  │
                    │ Metadata attached             │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │         EMBEDDINGS             │
                    │                               │
                    │ Text → Vector                 │
                    └───────────────┬───────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │        VECTOR DATABASE         │
                    │                               │
                    │ ChromaDB                      │
                    │                              │
                    │ vectors + chunks + metadata  │
                    └───────────────┬───────────────┘
                                    │
                                    │
                    ╔═══════════════▼═══════════════╗
                    ║             RAG                ║
                    ║                                ║
                    ║ User Question                 ║
                    ║       ↓                        ║
                    ║ Query Embedding               ║
                    ║       ↓                        ║
                    ║ Similarity Search              ║
                    ║       ↓                        ║
                    ║ Relevant Chunks               ║
                    ║       ↓                        ║
                    ║ Context + Question            ║
                    ║       ↓                        ║
                    ║ LLM                           ║
                    ╚═══════════════╤════════════════╝
                                    │
                                    ▼
                         ┌────────────────────┐
                         │       ANSWER       │
                         │                    │
                         │ Answer             │
                         │ Sources            │
                         │ Page references    │
                         │ Confidence         │
                         └────────────────────┘


documind-ai/
│
├── app/
│   │
│   ├── api/
│   │   ├── routes/
│   │   │   ├── documents.py
│   │   │   ├── chat.py
│   │   │   └── health.py
│   │   │
│   │   └── dependencies.py
│   │
│   ├── ingestion/
│   │   ├── pdf_loader.py
│   │   ├── docx_loader.py
│   │   ├── image_loader.py
│   │   └── detector.py
│   │
│   ├── extraction/
│   │   ├── parser.py
│   │   ├── ocr.py
│   │   ├── tables.py
│   │   └── layout.py
│   │
│   ├── processing/
│   │   ├── cleaner.py
│   │   ├── normalizer.py
│   │   ├── classifier.py
│   │   ├── structurer.py
│   │   └── metadata.py
│   │
│   ├── chunking/
│   │   ├── text_chunker.py
│   │   ├── semantic_chunker.py
│   │   └── table_chunker.py
│   │
│   ├── embeddings/
│   │   └── embedder.py
│   │
│   ├── vectorstore/
│   │   ├── chroma.py
│   │   ├── indexing.py
│   │   └── retrieval.py
│   │
│   ├── rag/
│   │   ├── retriever.py
│   │   ├── prompt.py
│   │   ├── chain.py
│   │   └── citations.py
│   │
│   ├── llm/
│   │   ├── groq.py
│   │   ├── embeddings.py
│   │   └── prompts.py
│   │
│   ├── models/
│   │   ├── document.py
│   │   ├── chunk.py
│   │   └── response.py
│   │
│   ├── database/
│   │   ├── postgres.py
│   │   └── models.py
│   │
│   ├── storage/
│   │   └── files.py
│   │
│   └── config.py
│
├── frontend/
│   └── ...
│
├── tests/
│
├── scripts/
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── test/
│
├── .env
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
└── README.md