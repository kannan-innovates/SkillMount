// src/pages/HomePage.tsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadZone from '../features/resume/components/UploadZone'
import ResumeCard from '../features/resume/components/ResumeCard'
import { analyzeResume } from '../features/resume/components/api'

export default function HomePage() {
  const [resume, setResume] = useState<any>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const navigate = useNavigate()

  async function handleAnalyze() {
    if (!resume) return
    setAnalyzing(true)
    try {
      const result = await analyzeResume(resume._id)
      // Update local state with analyzed status
      setResume((prev: any) => ({ ...prev, status: 'analyzed', aiAnalysis: result.analysis }))
    } catch (e) {
      console.error(e)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ fontFamily: 'Bricolage Grotesque', color: 'var(--text-primary)' }}
        >
          Upload Resume
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Upload your resume and let SkillMount analyze your career potential.
        </p>
      </div>

      {/* Upload zone */}
      {!resume && (
        <UploadZone onUploaded={setResume} />
      )}

      {/* Resume card after upload */}
      {resume && (
        <div className="flex flex-col gap-4">
          <ResumeCard
            resume={resume}
            onAnalyze={handleAnalyze}
            analyzing={analyzing}
          />

          {/* After analysis — navigate to dashboard */}
          {resume.status === 'analyzed' && (
            <button
              onClick={() => navigate(`/dashboard/${resume._id}`)}
              style={{
                background: 'var(--accent)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              View Full Dashboard →
            </button>
          )}

          {/* Upload a different one */}
          <button
            onClick={() => setResume(null)}
            style={{
              background: 'transparent',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '14px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Upload a different resume
          </button>
        </div>
      )}
    </div>
  )
}