import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-32 text-center">
      <p className="font-mono-label text-xs mb-3" style={{ color: 'var(--accent-dev)' }}>{'// error'}</p>
      <h1 className="text-7xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>404</h1>
      <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>This page doesn't exist.</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 font-mono-label text-xs transition-colors duration-150"
        style={{ background: 'var(--accent-dev)', color: '#0B0B0F' }}
      >
        Back to home
      </Link>
    </div>
  )
}