import api from '../../../shared/lib/axios'

export async function getSkillGap(resumeId: string, dreamJob: string) {
  const res = await api.post('/skill-gap/analyze', { resumeId, dreamJob })
  return res.data.data
}

export async function getCareerPivot(resumeId: string) {
  const res = await api.get(`/career-pivot/${resumeId}/predict`)
  return res.data.data
}

export async function getJobRecommendations(resumeId: string) {
  const res = await api.get(`/jobs/${resumeId}/recommend`)
  return res.data.data
}