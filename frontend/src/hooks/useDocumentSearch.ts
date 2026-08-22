import { useEffect, useState } from 'react'
import type { DocumentSummary } from '../types/document'

export function useDocumentSearch(documents: DocumentSummary[]) {
  const [query, setQuery] = useState('')
  const [filteredDocuments, setFilteredDocuments] = useState(documents)

  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      setFilteredDocuments(documents)
      return
    }

    setFilteredDocuments(
      documents.filter((document) =>
        `${document.title} ${document.fileName} ${document.summary}`.toLowerCase().includes(normalizedQuery),
      ),
    )
  }, [documents, query])

  return {
    query,
    setQuery,
    filteredDocuments,
  }
}
