import DocumentList from '../components/documents/DocumentList'
import { useDocumentSearch } from '../hooks/useDocumentSearch'
import { mockDocuments } from '../lib/mockData'

function DocumentsPage() {
  const { query, setQuery, filteredDocuments } = useDocumentSearch(mockDocuments)

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

      <DocumentList documents={filteredDocuments} />
    </div>
  )
}

export default DocumentsPage
