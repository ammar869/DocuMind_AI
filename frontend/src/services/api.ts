import type { ChatMessage } from '../types/chat'
import type { DocumentDetails, DocumentSummary } from '../types/document'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api'

interface ApiUploadDocumentResponse {
  document_id: string
  filename: string
  status: string
}

interface ApiDocumentSummaryResponse extends ApiUploadDocumentResponse {
  title: string
  uploaded_at: string
  page_count: number
  summary: string
}

interface ApiDocumentDetailsResponse extends ApiDocumentSummaryResponse {
  extracted_data: {
    document_type: string
    author: string
    key_topics: string[]
  }
  text_preview: string
  citations: string[]
}

interface ApiChatResponse {
  answer: string
  sources: Array<{
    page_number: number
    chunk_id: string
  }>
  document_id?: string | null
}

export interface UploadDocumentResponse {
  documentId: string
  message: string
  filename?: string
  status?: string
}

async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, options)

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

function mapDocumentSummary(document: ApiDocumentSummaryResponse): DocumentSummary {
  return {
    id: document.document_id,
    title: document.title,
    fileName: document.filename,
    uploadedAt: document.uploaded_at,
    status: document.status === 'uploaded' ? 'processing' : 'processed',
    pageCount: document.page_count,
    summary: document.summary,
  }
}

function mapDocumentDetails(document: ApiDocumentDetailsResponse): DocumentDetails {
  return {
    ...mapDocumentSummary(document),
    extractedData: {
      documentType: document.extracted_data.document_type,
      author: document.extracted_data.author,
      keyTopics: document.extracted_data.key_topics,
    },
    textPreview: document.text_preview,
    citations: document.citations,
  }
}

export async function getDocuments(): Promise<DocumentSummary[]> {
  const documents = await requestJson<ApiDocumentSummaryResponse[]>('/documents')
  return documents.map(mapDocumentSummary)
}

export async function getDocumentById(id: string): Promise<DocumentDetails | null> {
  const document = await requestJson<ApiDocumentDetailsResponse>(`/documents/${id}`)
  return mapDocumentDetails(document)
}

export async function uploadDocument(file: File): Promise<UploadDocumentResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await requestJson<ApiUploadDocumentResponse>('/documents/upload', {
    method: 'POST',
    body: formData,
  })

  return {
    documentId: response.document_id,
    filename: response.filename,
    status: response.status,
    message: `Uploaded ${response.filename}. Document ID: ${response.document_id}`,
  }
}

export async function sendChatMessage(message: string): Promise<ChatMessage> {
  const response = await requestJson<ApiChatResponse>('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question: message,
      document_id: null,
    }),
  })

  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: response.answer,
    sources: response.sources.map((source) => ({
      pageNumber: source.page_number,
      chunkId: source.chunk_id,
    })),
  }
}
