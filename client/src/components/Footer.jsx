import { Link } from 'react-router-dom'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t mt-24" style={{ borderColor: 'var(--border-hairline)' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono-label text-xs" style={{ color: 'var(--text-muted)' }}>
          © {year} Johnny Tran
        </p>
        <nav className="flex items-center gap-5 font-mono-label text-xs">
          <Link to="/about" style={{ color: 'var(--text-muted)' }}>About</Link>
          <Link to="/projects" style={{ color: 'var(--text-muted)' }}>Projects</Link>
          <Link to="/resume" style={{ color: 'var(--text-muted)' }}>Resume</Link>
          <a href="https://github.com/TfxNexus" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  )
}