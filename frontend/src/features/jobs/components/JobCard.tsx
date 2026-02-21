
interface Props { job: any }

export default function JobCard({ job }: Props) {
  const platformColors: Record<string, string> = {
    naukri: '#FF6B35',
    linkedin: '#0A66C2',
    indeed: '#2557A7',
  }

  return (
    <a
      href={job.url}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'block',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '20px',
        textDecoration: 'none',
        transition: 'border-color 0.15s',
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
            {job.title}
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
            {job.company} · {job.location}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <span style={{
            background: platformColors[job.platform] + '22',
            color: platformColors[job.platform],
            padding: '2px 10px',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'capitalize',
          }}>
            {job.platform}
          </span>
          <span style={{ color: 'var(--success)', fontSize: '13px', fontWeight: 700 }}>
            {job.matchScore}% match
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 500 }}>{job.salaryRange}</p>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'capitalize' }}>
          {job.experienceLevel}
        </span>
      </div>
    </a>
  )
}