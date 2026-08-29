import { Sun, Moon } from 'lucide-react'
import { useDarkMode } from '../hooks/useDarkMode'

export function DarkModeToggle() {
  const [isDark, toggle] = useDarkMode()

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center gap-1.5 px-3 py-1.5 font-mono-label text-xs border transition-all duration-150"
      style={{ borderColor: 'var(--border-hairline-strong)', color: 'var(--text-secondary)', background: 'var(--bg-raised)' }}
    >
      {isDark ? <Sun size={13} strokeWidth={1.75} /> : <Moon size={13} strokeWidth={1.75} />}
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}