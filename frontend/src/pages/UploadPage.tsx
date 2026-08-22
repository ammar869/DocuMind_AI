import { useState } from 'react'
import UploadBox from '../components/documents/UploadBox'
import { uploadDocument } from '../services/api'

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [status, setStatus] = useState('Waiting for a document.')

  async function handleUpload() {
    if (!selectedFile) {
      setStatus('Choose a file before uploading.')
      return
    }

    setStatus('Preparing upload placeholder...')
    const response = await uploadDocument(selectedFile)
    setStatus(response.message)
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
          <button type="button" onClick={handleUpload}>
            Upload document
          </button>
          <p>{status}</p>
        </div>
      </section>
    </div>
  )
}

export default UploadPage
