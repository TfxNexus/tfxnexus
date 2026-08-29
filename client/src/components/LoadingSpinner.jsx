export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <div
        className="w-6 h-6 border-2 rounded-full animate-spin"
        style={{ borderColor: 'var(--accent-dev-dim)', borderTopColor: 'var(--accent-dev)' }}
      />
    </div>
  )
}