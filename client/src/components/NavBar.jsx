import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { DarkModeToggle } from './DarkModeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/history', label: 'History' },
]

function navLinkClass({ isActive }) {
  return isActive
    ? 'font-medium'
    : 'transition-colors duration-150'
}

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 backdrop-blur-sm border-b"
      style={{ background: 'rgba(11,11,15,0.95)', borderColor: 'var(--border-hairline)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="font-mono-label text-xs"
          style={{ color: 'var(--text-primary)' }}
        >
          Johnny Tran
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 font-mono-label text-xs">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={navLinkClass}
              end={to === '/'}
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-dev)' : 'var(--text-muted)',
              })}
            >
              {label}
            </NavLink>
          ))}
          <DarkModeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            className="p-2 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden border-t pb-2 font-mono-label text-xs"
          style={{ borderColor: 'var(--border-hairline)', background: 'var(--bg)' }}
        >
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="block px-5 py-3 transition-colors"
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-dev)' : 'var(--text-muted)',
              })}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}