import { useMemo, useState } from 'react'
import type { DocumentSummary } from '../types/document'

export function useDocumentSearch(documents: DocumentSummary[]) {
  const [query, setQuery] = useState('')

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return documents
    }

    return documents.filter((document) =>
      `${document.title} ${document.fileName} ${document.summary}`.toLowerCase().includes(normalizedQuery),
    )
  }, [documents, query])

  return {
    query,
    setQuery,
    filteredDocuments,
  }
}
