type BadgeVariant = 'pending' | 'analyzed' | 'approved' | 'easy' | 'moderate' | 'hard'

const styles: Record<BadgeVariant, { bg: string; color: string }> = {
  pending:  { bg: '#1C2D1A', color: '#F59E0B' },
  analyzed: { bg: '#0E2A3A', color: '#00AEEF' },
  approved: { bg: '#0E2A1E', color: '#10B981' },
  easy:     { bg: '#0E2A1E', color: '#10B981' },
  moderate: { bg: '#2A1F0E', color: '#F59E0B' },
  hard:     { bg: '#2A0E0E', color: '#EF4444' },
}

export default function Badge({ label }: { label: BadgeVariant }) {
  const s = styles[label] ?? { bg: 'var(--bg-card)', color: 'var(--text-muted)' }
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        padding: '2px 10px',
        borderRadius: '999px',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'capitalize',
      }}
    >
      {label}
    </span>
  )
}