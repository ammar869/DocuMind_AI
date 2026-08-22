import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import ChatPage from './pages/ChatPage'
import DashboardPage from './pages/DashboardPage'
import DocumentDetailsPage from './pages/DocumentDetailsPage'
import DocumentsPage from './pages/DocumentsPage'
import UploadPage from './pages/UploadPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/documents/:id" element={<DocumentDetailsPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
