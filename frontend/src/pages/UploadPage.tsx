import { useState } from 'react'
import UploadBox from '../components/documents/UploadBox'
import { uploadDocument } from '../services/api'

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [status, setStatus] = useState('Waiting for a document.')
  const [isUploading, setIsUploading] = useState(false)

  async function handleUpload() {
    if (!selectedFile) {
      setStatus('Choose a file before uploading.')
      return
    }

    setIsUploading(true)
    setStatus('Uploading document...')

    try {
      const response = await uploadDocument(selectedFile)
      setStatus(response.message)
      setSelectedFile(null)
    } catch {
      setStatus('Upload failed. Make sure FastAPI is running and the file is a PDF.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="page-stack">
      <section className="section-heading">
        <div>
          <h1>Upload</h1>
          <p>Add a document for extraction, embeddings, RAG, and question answering.</p>
        </div>
      </section>

      <section className="panel">
        <UploadBox selectedFile={selectedFile} onFileChange={setSelectedFile} />
        <div className="upload-actions">
          <button type="button" onClick={handleUpload} disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload document'}
          </button>
          <p>{status}</p>
        </div>
      </section>
    </div>
  )
}

export default UploadPage
