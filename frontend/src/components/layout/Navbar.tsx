import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Dashboard', path: '/' },
  { label: 'Documents', path: '/documents' },
  { label: 'AI Chat', path: '/chat' },
  { label: 'Upload', path: '/upload' },
]

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand" aria-label="DocuMind AI dashboard">
        <span className="brand-mark">D</span>
        <span>
          <strong>DocuMind AI</strong>
          <small>Document intelligence</small>
        </span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <NavLink key={link.path} to={link.path} className="nav-link">
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
