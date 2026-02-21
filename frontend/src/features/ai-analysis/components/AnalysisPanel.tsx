

interface Props { analysis: any }

export default function AnalysisPanel({ analysis }: Props) {
  if (!analysis) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ATS Score */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
        <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          ATS Score
        </p>
        <div className="flex items-end gap-3 mb-3">
          <span style={{ fontSize: '48px', fontWeight: 700, fontFamily: 'Bricolage Grotesque', color: analysis.ats_score >= 70 ? 'var(--success)' : analysis.ats_score >= 50 ? 'var(--warning)' : 'var(--danger)' }}>
            {analysis.ats_score}
          </span>
          <span style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>/100</span>
        </div>
        {/* Progress bar */}
        <div style={{ height: '6px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${analysis.ats_score}%`,
            borderRadius: '999px',
            background: analysis.ats_score >= 70 ? 'var(--success)' : analysis.ats_score >= 50 ? 'var(--warning)' : 'var(--danger)',
            transition: 'width 1s ease',
          }} />
        </div>
      </div>

      {/* Summary */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Summary</p>
        <p style={{ color: 'var(--text-primary)', fontSize: '14px', lineHeight: '1.7' }}>{analysis.summary}</p>
      </div>

      {/* Strengths & Weaknesses */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Strengths</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {analysis.strengths?.map((s: string, i: number) => (
              <li key={i} style={{ color: 'var(--text-primary)', fontSize: '13px', display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--success)' }}>✓</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
          <p className="text-xs font-semibold mb-3" style={{ color: 'var(--warning)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Weaknesses</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {analysis.weaknesses?.map((w: string, i: number) => (
              <li key={i} style={{ color: 'var(--text-primary)', fontSize: '13px', display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--warning)' }}>⚠</span> {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
        <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Improvement Suggestions
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {analysis.improvement_suggestions?.map((s: string, i: number) => (
            <li key={i} style={{ color: 'var(--text-primary)', fontSize: '13px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700, marginTop: '1px' }}>{i + 1}.</span> {s}
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}