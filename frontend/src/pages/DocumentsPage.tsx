import { useEffect, useState } from 'react'
import DocumentList from '../components/documents/DocumentList'
import { useDocumentSearch } from '../hooks/useDocumentSearch'
import { getDocuments } from '../services/api'
import type { DocumentSummary } from '../types/document'

function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const { query, setQuery, filteredDocuments } = useDocumentSearch(documents)

  useEffect(() => {
    let isMounted = true

    async function loadDocuments() {
      try {
        const documentsFromApi = await getDocuments()

        if (isMounted) {
          setDocuments(documentsFromApi)
        }
      } catch {
        if (isMounted) {
          setErrorMessage('Could not load documents. Make sure FastAPI is running.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDocuments()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="page-stack">
      <section className="section-heading">
        <div>
          <h1>Documents</h1>
          <p>Search, review, and open documents that will later come from FastAPI.</p>
        </div>
      </section>

      <section className="toolbar" aria-label="Document filters">
        <label>
          <span>Search documents</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, file name, or summary"
          />
        </label>
      </section>

      {isLoading ? <div className="empty-state">Loading documents...</div> : null}
      {errorMessage ? <div className="empty-state">{errorMessage}</div> : null}
      {!isLoading && !errorMessage ? <DocumentList documents={filteredDocuments} /> : null}
    </div>
  )
}

export default DocumentsPage
