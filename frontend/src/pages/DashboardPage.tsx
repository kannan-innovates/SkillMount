// src/pages/DashboardPage.tsx

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getResumeById } from '../features/resume/components/api'
import { getJobRecommendations,getCareerPivot } from '../features/ai-analysis/components/api'
import AnalysisPanel from '../features/ai-analysis/components/AnalysisPanel'
import SkillGapPanel from '../features/skill-gap/components/SkillGapPanel'
import JobCard from '../features/jobs/components/JobCard'
import Spinner from '../shared/components/Spinner'
import Badge from '../shared/components/Badge'

const TABS = ['AI Analysis', 'Skill Gap', 'Jobs', 'Career Paths']

export default function DashboardPage() {
  const { id } = useParams<{ id: string }>()
  const [resume, setResume] = useState<any>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [careerPaths, setCareerPaths] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('AI Analysis')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      getResumeById(id),
      getJobRecommendations(id),
      getCareerPivot(id),
    ]).then(([r, j, c]) => {
      setResume(r)
      setJobs(j.recommendations)
      setCareerPaths(c.suggestedPaths)
    }).finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <Spinner size={36} />
    </div>
  )

  if (!resume) return (
    <p style={{ color: 'var(--danger)' }}>Resume not found.</p>
  )

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Bricolage Grotesque', color: 'var(--text-primary)' }}>
            {resume.fileName}
          </h1>
          <Badge label={resume.status} />
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          {resume.skills?.length} skills detected · {new Date(resume.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-1 mb-6 p-1 rounded-xl"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', width: 'fit-content' }}
      >
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
              background: activeTab === tab ? 'var(--bg-card)' : 'transparent',
              color: activeTab === tab ? 'var(--accent)' : 'var(--text-muted)',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'AI Analysis' && (
        <AnalysisPanel analysis={resume.aiAnalysis} />
      )}

      {activeTab === 'Skill Gap' && (
        <SkillGapPanel resumeId={resume._id} />
      )}

      {activeTab === 'Jobs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{jobs.length} jobs matched</p>
          {jobs.map((job: any) => <JobCard key={job.id} job={job} />)}
        </div>
      )}

      {activeTab === 'Career Paths' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {careerPaths.map((path: any) => (
            <div
              key={path.role}
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}
            >
              <div className="flex justify-between items-center mb-3">
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, textTransform: 'capitalize' }}>{path.role}</h4>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Badge label={path.transitionDifficulty} />
                  <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '14px' }}>{path.matchPercentage}%</span>
                </div>
              </div>
              <div style={{ height: '4px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${path.matchPercentage}%`, background: 'var(--accent)', borderRadius: '999px' }} />
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}