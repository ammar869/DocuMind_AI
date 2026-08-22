import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../components/ui/StatusBadge'
import { mockDocumentDetails } from '../lib/mockData'

function DocumentDetailsPage() {
  const { id } = useParams()
  const document = mockDocumentDetails.find((item) => item.id === id)

  if (!document) {
    return (
      <section className="empty-state">
        <strong>Document not found</strong>
        <p>The selected mock document does not exist.</p>
        <Link to="/documents" className="text-link">
          Back to documents
        </Link>
      </section>
    )
  }

  return (
    <div className="page-stack">
      <section className="details-header">
        <div>
          <Link to="/documents" className="text-link">
            Back to documents
          </Link>
          <h1>{document.title}</h1>
          <p>{document.fileName}</p>
        </div>
        <StatusBadge status={document.status} />
      </section>

      <section className="details-grid">
        <article className="panel">
          <h2>Document information</h2>
          <p>Uploaded: {document.uploadedAt}</p>
          <p>Pages: {document.pageCount}</p>
          <p>{document.summary}</p>
        </article>

        <article className="panel">
          <h2>Processing status</h2>
          <p>Current status: {document.status}</p>
          <p>FastAPI will later update this while extraction, embeddings, and indexing run.</p>
        </article>

        <article className="panel">
          <h2>Structured data</h2>
          <p>Type: {document.extractedData.documentType}</p>
          <p>Author: {document.extractedData.author}</p>
          <ul>
            {document.extractedData.keyTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>Citations</h2>
          <ul>
            {document.citations.map((citation) => (
              <li key={citation}>{citation}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="panel">
        <h2>Document text</h2>
        <p>{document.textPreview}</p>
      </section>
    </div>
  )
}

export default DocumentDetailsPage
