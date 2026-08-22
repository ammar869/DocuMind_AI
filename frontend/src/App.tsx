import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import UploadDocument from "./components/UploadDocument"
import './App.css'

function App() {
  return (
    <div>
      <Header />

      <div>
        <Sidebar />

        <main>
          <UploadDocument />
        </main>
      </div>
    </div>
  )
}

export default App