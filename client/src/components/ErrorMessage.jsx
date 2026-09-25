import { AlertTriangle } from 'lucide-react'

export function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <AlertTriangle size={22} strokeWidth={1.5} style={{ color: '#FF3357' }} />
      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {message || 'Something went wrong. Please try again.'}
      </p>
    </div>
  )
}