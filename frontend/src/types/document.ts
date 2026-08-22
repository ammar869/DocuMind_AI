export type ProcessingStatus = 'processed' | 'processing' | 'failed'

export interface DocumentSummary {
  id: string
  title: string
  fileName: string
  uploadedAt: string
  status: ProcessingStatus
  pageCount: number
  summary: string
}

export interface DocumentDetails extends DocumentSummary {
  extractedData: {
    documentType: string
    author: string
    keyTopics: string[]
  }
  textPreview: string
  citations: string[]
}
