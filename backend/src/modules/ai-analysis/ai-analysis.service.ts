
import Groq from 'groq-sdk'
import { Resume } from '../resume/resume.model'
import { AIAnalysisResult } from './ai-analysis.types'
import { buildResumeAnalysisPrompt } from './ai-analysis.prompt'

let groq: Groq | null = null

function getGroqClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured')
  }

  if (!groq) {
    groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
  }

  return groq
}

async function analyzeWithGroq(rawText: string): Promise<AIAnalysisResult> {
  const prompt = buildResumeAnalysisPrompt(rawText)
  const client = getGroqClient()

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',   // fast + free on Groq
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,           // lower = more consistent/structured output
    max_tokens: 1024,
  })

  const content = response.choices[0]?.message?.content
  if (!content) throw new Error('No response from Groq')

  // Safely parse — Groq might still occasionally wrap in backticks
  const cleaned = content.replace(/```json|```/g, '').trim()

  try {
    const parsed: AIAnalysisResult = JSON.parse(cleaned)
    return parsed
  } catch {
    throw new Error('Groq returned invalid JSON. Raw: ' + cleaned)
  }
}

export async function analyzeResume(resumeId: string) {
  // 1. Find the resume
  const resume = await Resume.findById(resumeId)
  if (!resume) throw new Error('Resume not found')

  if (!resume.rawText) throw new Error('Resume has no extracted text')

  // 2. Call Groq
  const analysis = await analyzeWithGroq(resume.rawText)

  // 3. Save back into the resume document
  resume.aiAnalysis = analysis
  resume.status = 'analyzed'
  await resume.save()

  return { resumeId, analysis }
}