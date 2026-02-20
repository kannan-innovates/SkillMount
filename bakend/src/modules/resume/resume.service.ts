// src/modules/resume/resume.service.ts

import fs from 'fs'
import path from 'path'
import { PDFParse } from 'pdf-parse'
import mammoth from 'mammoth'
import { Resume, IResume } from './resume.model'
import { ParsedResume } from './resume.types'
import { KNOWN_SKILLS } from '../../shared/constants/skills.constants'

// ─── Text Extraction ────────────────────────────────────────────

async function extractTextFromPDF(filePath: string): Promise<string> {
     const buffer = fs.readFileSync(filePath)
     const parser = new PDFParse({ data: buffer })
     const result = await parser.getText()
     return result.text
}

async function extractTextFromDOCX(filePath: string): Promise<string> {
     const result = await mammoth.extractRawText({ path: filePath })
     return result.value
}

export async function extractText(filePath: string, mimetype: string): Promise<{ text: string; fileType: 'pdf' | 'docx' }> {
     let text = ''
     let fileType: 'pdf' | 'docx'

     if (mimetype === 'application/pdf') {
          text = await extractTextFromPDF(filePath)
          fileType = 'pdf'
     } else if (
          mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
     ) {
          text = await extractTextFromDOCX(filePath)
          fileType = 'docx'
     } else {
          throw new Error('Unsupported file type. Only PDF and DOCX allowed.')
     }

     return { text, fileType }
}

// ─── Basic Parsing ──────

function parseSkills(text: string): string[] {
     const lower = text.toLowerCase()
     return KNOWN_SKILLS.filter(skill => lower.includes(skill))
}

function parseEducation(text: string): string[] {
     const lines = text.split('\n')
     const keywords = ['bachelor', 'master', 'b.tech', 'b.e', 'm.tech', 'mba', 'phd', 'university', 'college', 'institute', 'degree']
     return lines
          .filter(line => keywords.some(kw => line.toLowerCase().includes(kw)))
          .map(line => line.trim())
          .filter(line => line.length > 3)
}

function parseExperience(text: string): string[] {
     const lines = text.split('\n')
     const keywords = ['engineer', 'developer', 'manager', 'analyst', 'intern', 'consultant', 'architect', 'lead', 'worked at', 'employed']
     const yearPattern = /\d{4}\s*[-–]\s*(\d{4}|present)/i
     return lines
          .filter(line => keywords.some(kw => line.toLowerCase().includes(kw)) || yearPattern.test(line))
          .map(line => line.trim())
          .filter(line => line.length > 3)
}

function parseLocation(text: string): string {
     // Look for common patterns like "Chennai, India" or "New York, USA"
     const locationPattern = /([A-Z][a-z]+(?:\s[A-Z][a-z]+)*),\s*([A-Z][a-zA-Z\s]+)/
     const match = text.match(locationPattern)
     return match ? match[0] : ''
}

// ─── Main Service Function ───────────────────────────────────────

export async function processAndSaveResume(file: Express.Multer.File): Promise<IResume> {
     const { text, fileType } = await extractText(file.path, file.mimetype)

     // Delete temp file after extraction
     fs.unlinkSync(file.path)

     const parsed: ParsedResume = {
          rawText: text,
          fileType,
          fileName: file.originalname,
          skills: parseSkills(text),
          education: parseEducation(text),
          experience: parseExperience(text),
          location: parseLocation(text),
     }

     const resume = await Resume.create(parsed)
     return resume
}
