function UploadDocument() {
  return (
    <section>
      <h2>Upload a document</h2>

      <p>
        Upload a PDF and let DocuMind AI analyze it.
      </p>

      <input type="file" accept=".pdf" />

      <button>Upload</button>
    </section>
  )
}

export default UploadDocument