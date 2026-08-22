import type { ChatMessage } from '../types/chat'
import type { DocumentDetails, DocumentSummary } from '../types/document'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

export interface UploadDocumentResponse {
  documentId: string
  message: string
}

export async function getDocuments(): Promise<DocumentSummary[]> {
  console.info('Future FastAPI endpoint:', `${API_BASE_URL}/documents`)
  return []
}

export async function getDocumentById(id: string): Promise<DocumentDetails | null> {
  console.info('Future FastAPI endpoint:', `${API_BASE_URL}/documents/${id}`)
  return null
}

export async function uploadDocument(file: File): Promise<UploadDocumentResponse> {
  console.info('Future FastAPI upload:', `${API_BASE_URL}/documents/upload`, file.name)
  return {
    documentId: 'mock-document-id',
    message: 'Upload placeholder completed in the frontend.',
  }
}

export async function sendChatMessage(message: string): Promise<ChatMessage> {
  console.info('Future FastAPI chat:', `${API_BASE_URL}/chat`, message)
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: 'This is a placeholder response. Later, FastAPI will answer using RAG and citations.',
  }
}
