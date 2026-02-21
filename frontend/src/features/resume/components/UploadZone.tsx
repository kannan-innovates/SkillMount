
import { useRef, useState, type DragEvent } from 'react'
import Spinner from '../../../shared/components/Spinner'
import { uploadResume } from './api'

interface Props {
  onUploaded: (resume: unknown) => void
}

export default function UploadZone({ onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(file: File) {
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(file.type)) {
      setError('Only PDF or DOCX files are supported.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const resume = await uploadResume(file)
      onUploaded(resume)
    } catch (e: any) {
      setError(e.response?.data?.message || 'Upload failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div
      onClick={() => !loading && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      style={{
        border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '16px',
        padding: '60px 40px',
        textAlign: 'center',
        cursor: loading ? 'default' : 'pointer',
        background: dragging ? 'rgba(0,174,239,0.05)' : 'var(--bg-surface)',
        transition: 'all 0.2s',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {loading ? (
        <div className="flex flex-col items-center gap-3">
          <Spinner size={32} />
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Processing your resume...</p>
        </div>
      ) : (
        <>
          {/* Upload icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(0,174,239,0.1)' }}
          >
            <span style={{ fontSize: '28px' }}>↑</span>
          </div>

          <h3
            className="text-xl font-semibold mb-2"
            style={{ fontFamily: 'Bricolage Grotesque', color: 'var(--text-primary)' }}
          >
            Drop your resume here
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>
            or click to browse
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            PDF or DOCX · Max 5MB
          </p>
        </>
      )}

      {error && (
        <p className="mt-4 text-sm" style={{ color: 'var(--danger)' }}>{error}</p>
      )}
    </div>
  )
}