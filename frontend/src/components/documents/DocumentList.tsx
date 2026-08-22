import type { DocumentSummary } from '../../types/document'
import EmptyState from '../ui/EmptyState'
import DocumentCard from './DocumentCard'

interface DocumentListProps {
  documents: DocumentSummary[]
}

function DocumentList({ documents }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <EmptyState
        title="No documents found"
        message="Upload a PDF or adjust your search to see documents here."
      />
    )
  }

  return (
    <div className="document-grid">
      {documents.map((document) => (
        <DocumentCard key={document.id} document={document} />
      ))}
    </div>
  )
}

export default DocumentList
