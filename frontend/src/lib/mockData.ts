import type { ChatMessage } from '../types/chat'
import type { DocumentDetails, DocumentSummary } from '../types/document'

export const mockDocuments: DocumentSummary[] = [
  {
    id: 'doc-001',
    title: 'Vendor Agreement Review',
    fileName: 'vendor-agreement.pdf',
    uploadedAt: '2026-08-18',
    status: 'processed',
    pageCount: 18,
    summary: 'Contract terms, payment clauses, renewal windows, and risk notes.',
  },
  {
    id: 'doc-002',
    title: 'Research Notes',
    fileName: 'rag-research-notes.pdf',
    uploadedAt: '2026-08-20',
    status: 'processing',
    pageCount: 42,
    summary: 'Technical notes about retrieval, embeddings, chunking, and evaluation.',
  },
  {
    id: 'doc-003',
    title: 'Insurance Policy',
    fileName: 'insurance-policy.pdf',
    uploadedAt: '2026-08-21',
    status: 'processed',
    pageCount: 27,
    summary: 'Coverage limits, exclusions, claim requirements, and policy dates.',
  },
]

export const mockDocumentDetails: DocumentDetails[] = mockDocuments.map((document) => ({
  ...document,
  extractedData: {
    documentType: document.title.includes('Agreement') ? 'Legal contract' : 'Reference document',
    author: 'Unknown',
    keyTopics: ['Risk', 'Summary', 'Important dates'],
  },
  textPreview:
    'This area will show extracted document text after the FastAPI backend processes the uploaded PDF.',
  citations: ['Page 2, section 1.1', 'Page 7, paragraph 3', 'Page 14, table 2'],
}))

export const initialMessages: ChatMessage[] = [
  {
    id: 'assistant-welcome',
    role: 'assistant',
    content: 'Ask a question about your documents. I will use mock answers until the backend is connected.',
  },
]
