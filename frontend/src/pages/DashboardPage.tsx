import { Link } from 'react-router-dom'
import DocumentList from '../components/documents/DocumentList'
import StatCard from '../components/ui/StatCard'
import { mockDocuments } from '../lib/mockData'

function DashboardPage() {
  const processedCount = mockDocuments.filter((document) => document.status === 'processed').length

  return (
    <div className="page-stack">
      <section className="hero-section">
        <div>
          <p className="eyebrow">AI Document Intelligence</p>
          <h1>Understand documents faster with clean, traceable answers.</h1>
          <p>
            Upload documents, extract structured information, and prepare for RAG-powered question
            answering with citations.
          </p>
        </div>
        <Link to="/upload" className="primary-button">
          Upload document
        </Link>
      </section>

      <section className="stats-grid" aria-label="Document statistics">
        <StatCard label="Documents" value={String(mockDocuments.length)} hint="Mock records today" />
        <StatCard label="Processed" value={String(processedCount)} hint="Ready for review" />
        <StatCard label="Pages" value="87" hint="Across all mock files" />
        <StatCard label="Answers" value="0" hint="Chat backend pending" />
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <h2>Recent documents</h2>
            <p>These cards use mock data until FastAPI is connected.</p>
          </div>
          <Link to="/documents" className="text-link">
            View all
          </Link>
        </div>
        <DocumentList documents={mockDocuments.slice(0, 2)} />
      </section>
    </div>
  )
}

export default DashboardPage
