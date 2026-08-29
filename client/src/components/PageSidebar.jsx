import { NavLink } from 'react-router-dom'
import { Home, User, Gamepad2, FileText, Clock, Terminal, Video, Music } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/about', label: 'About', Icon: User },
  { to: '/projects', label: 'Projects', Icon: Gamepad2 },
  { to: '/resume', label: 'Resume', Icon: FileText },
  { to: '/history', label: 'My History', Icon: Clock },
]

const links = [
  { label: 'GitHub', href: 'https://github.com/TfxNexus', Icon: Terminal },
  { label: 'YouTube', href: 'https://www.youtube.com/@TfxNexusOsu', Icon: Video },
  { label: 'osu! Profile', href: 'https://osu.ppy.sh/users/Tfx%20Nexus', Icon: Music },
]

export function LeftSidebar() {
  return (
    <aside className="hidden xl:flex flex-col gap-4 w-52 flex-shrink-0 pt-8">
      <div className="border" style={{ borderColor: 'var(--border-hairline)', background: 'var(--bg-raised)' }}>
        <p className="font-mono-label text-xs px-4 pt-4 pb-3" style={{ color: 'var(--text-muted)' }}>Navigation</p>
        <nav className="flex flex-col pb-2">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="flex items-center gap-2.5 px-4 py-2 text-sm transition-colors duration-150"
              style={({ isActive }) => ({
                color: isActive ? 'var(--accent-dev)' : 'var(--text-secondary)',
              })}
            >
              <Icon size={15} strokeWidth={1.75} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export function RightSidebar() {
  return (
    <aside className="hidden xl:flex flex-col gap-4 w-52 flex-shrink-0 pt-8">
      {/* Profile */}
      <div className="border p-4 flex flex-col items-center text-center gap-2" style={{ borderColor: 'var(--border-hairline)', background: 'var(--bg-raised)' }}>
        <div
          className="w-12 h-12 flex items-center justify-center text-sm font-bold border"
          style={{ borderColor: 'var(--accent-dev-dim)', color: 'var(--accent-dev)' }}
        >
          JT
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Johnny Tran</p>
          <p className="font-mono-label text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>@TfxNexus</p>
        </div>
      </div>

      {/* Links */}
      <div className="border p-4" style={{ borderColor: 'var(--border-hairline)', background: 'var(--bg-raised)' }}>
        <p className="font-mono-label text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Links</p>
        <div className="flex flex-col gap-2.5">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-xs transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Icon size={14} strokeWidth={1.75} />
              {label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  )
}