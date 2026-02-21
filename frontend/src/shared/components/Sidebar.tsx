import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Upload Resume', icon: '↑' },
  { to: '/admin', label: 'Admin Dashboard', icon: '⊞' },
]

export default function Sidebar() {
  return (
    <aside
      className="fixed top-0 left-0 h-screen w-64 flex flex-col"
      style={{ background: 'var(--bg-surface)', borderRight: '1px solid var(--border)' }}
    >
      {/* Logo */}
      <div className="px-6 py-6" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: 'var(--accent)' }}
          >
            S
          </div>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ fontFamily: 'Bricolage Grotesque', color: 'var(--text-primary)' }}
          >
            SkillMount
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'all 0.15s',
              background: isActive ? 'var(--bg-card)' : 'transparent',
              color: isActive ? 'var(--accent)' : 'var(--text-muted)',
              borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
            })}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4" style={{ borderTop: '1px solid var(--border)' }}>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          SkillMount™ v1.0
        </p>
      </div>
    </aside>
  )
}