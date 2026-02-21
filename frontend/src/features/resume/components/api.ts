
import api from '../../../shared/lib/axios'

export async function uploadResume(file: File) {
  const formData = new FormData()
  formData.append('resume', file)
  const res = await api.post('/resumes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data.data
}

export async function getAllResumes() {
  const res = await api.get('/resumes')
  return res.data.data
}

export async function getResumeById(id: string) {
  const res = await api.get(`/resumes/${id}`)
  return res.data.data
}

export async function analyzeResume(id: string) {
  const res = await api.post(`/analysis/${id}/analyze`)
  return res.data.data
}