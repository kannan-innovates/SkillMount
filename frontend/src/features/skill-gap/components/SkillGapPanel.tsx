

import { useState } from 'react'
import { getSkillGap } from '../../ai-analysis/components/api'
import Spinner from '../../../shared/components/Spinner'
import Badge from '../../../shared/components/Badge'

const JOB_OPTIONS = [
  'fullstack developer', 'frontend developer', 'backend developer',
  'devops engineer', 'data scientist', 'ml engineer', 'mobile developer',
]

interface Props { resumeId: string }

export default function SkillGapPanel({ resumeId }: Props) {
  const [dreamJob, setDreamJob] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAnalyze() {
    if (!dreamJob) return
    setLoading(true)
    setError('')
    try {
      const data = await getSkillGap(resumeId, dreamJob)
      setResult(data)
    } catch (e: any) {
      setError(e.response?.data?.message || 'Analysis failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Dream job selector */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
        <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Select Dream Job
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select
            value={dreamJob}
            onChange={e => setDreamJob(e.target.value)}
            style={{
              flex: 1,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '10px 14px',
              color: 'var(--text-primary)',
              fontSize: '14px',
              outline: 'none',
            }}
          >
            <option value="">Choose a role...</option>
            {JOB_OPTIONS.map(j => <option key={j} value={j}>{j}</option>)}
          </select>
          <button
            onClick={handleAnalyze}
            disabled={!dreamJob || loading}
            style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: (!dreamJob || loading) ? 'default' : 'pointer',
              opacity: (!dreamJob || loading) ? 0.6 : 1,
            }}
          >
            {loading ? <Spinner size={16} /> : 'Analyze'}
          </button>
        </div>
        {error && <p className="mt-2 text-sm" style={{ color: 'var(--danger)' }}>{error}</p>}
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Match percentage */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Match for {result.dreamJob}
            </p>
            <div className="flex items-end gap-2 mb-3">
              <span style={{ fontSize: '42px', fontWeight: 700, fontFamily: 'Bricolage Grotesque', color: 'var(--accent)' }}>
                {result.matchPercentage}%
              </span>
            </div>
            <div style={{ height: '6px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${result.matchPercentage}%`, background: 'var(--accent)', borderRadius: '999px', transition: 'width 1s ease' }} />
            </div>
          </div>

          {/* Matched vs Missing */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>You Have</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {result.matchedSkills.map((s: string) => (
                  <span key={s} style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--success)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '6px', padding: '3px 10px', fontSize: '12px' }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--danger)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>You Need</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {result.missingSkills.map((s: string) => (
                  <span key={s} style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '3px 10px', fontSize: '12px' }}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended courses */}
          {result.recommendedCourses?.length > 0 && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Recommended Courses
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {result.recommendedCourses.map((c: any, i: number) => (
                  <a
                    key={i}
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: 'var(--bg-surface)',
                      borderRadius: '10px',
                      textDecoration: 'none',
                      border: '1px solid var(--border)',
                      transition: 'border-color 0.15s',
                    }}
                  >
                    <div>
                      <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 500 }}>{c.title}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{c.platform} · {c.skill}</p>
                    </div>
                    <Badge label={c.level} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}