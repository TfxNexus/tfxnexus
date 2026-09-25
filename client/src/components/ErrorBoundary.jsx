import { Component } from 'react'
import { AlertOctagon } from 'lucide-react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error in app:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-lg mx-auto px-4 py-32 text-center">
          <AlertOctagon size={28} strokeWidth={1.5} style={{ color: 'var(--accent-game)' }} className="mx-auto mb-4" />
          <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--accent-dev)' }}>{'// error'}</p>
          <h1 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Something broke</h1>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            This part of the page hit an unexpected error. Try reloading.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 font-mono-label text-xs transition-colors"
            style={{ background: 'var(--accent-dev)', color: '#0B0B0F' }}
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}