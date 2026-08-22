interface UploadBoxProps {
  selectedFile: File | null
  onFileChange: (file: File | null) => void
}

function UploadBox({ selectedFile, onFileChange }: UploadBoxProps) {
  return (
    <label className="upload-box">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
      />
      <span>Drop a document here or choose a file</span>
      <small>PDF, DOCX, or TXT. Backend upload will be connected later.</small>
      {selectedFile ? <strong>Selected: {selectedFile.name}</strong> : null}
    </label>
  )
}

export default UploadBox
