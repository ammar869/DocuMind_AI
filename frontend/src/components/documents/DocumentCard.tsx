import { Link } from 'react-router-dom'
import type { DocumentSummary } from '../../types/document'
import StatusBadge from '../ui/StatusBadge'

interface DocumentCardProps {
  document: DocumentSummary
}

function DocumentCard({ document }: DocumentCardProps) {
  return (
    <article className="document-card">
      <div className="card-header">
        <div>
          <h3>{document.title}</h3>
          <p>{document.fileName}</p>
        </div>
        <StatusBadge status={document.status} />
      </div>

      <p>{document.summary}</p>

      <div className="document-meta">
        <span>{document.pageCount} pages</span>
        <span>Uploaded {document.uploadedAt}</span>
      </div>

      <Link to={`/documents/${document.id}`} className="text-link">
        View details
      </Link>
    </article>
  )
}

export default DocumentCard
