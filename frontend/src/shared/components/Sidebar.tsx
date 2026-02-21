import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Upload Resume', icon: '↑' },
  { to: '/admin', label: 'Admin Dashboard', icon: '⊞' },
]

export default function Sidebar() {
  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '256px',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
              background: 'var(--accent)',
            }}
          >
            S
          </div>
          <span
            style={{ fontFamily: 'Bricolage Grotesque', color: 'var(--text-primary)', fontSize: '18px', fontWeight: 'bold', letterSpacing: '-0.5px' }}
          >
            SkillMount
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
      <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          SkillMount™ v1.0
        </p>
      </div>
    </aside>
  )
}