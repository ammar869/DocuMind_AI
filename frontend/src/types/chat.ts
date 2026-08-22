export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: ChatSource[]
}

export interface ChatSource {
  pageNumber: number
  chunkId: string
}
