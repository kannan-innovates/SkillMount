
import { Router } from 'express'
import { uploadResume, getAllResumes, getResumeById } from './resume.controller'
import { uploadMiddleware } from './resume.middleware'

const router = Router()

router.post('/', uploadMiddleware.single('resume'), uploadResume)
router.get('/', getAllResumes)
router.get('/:id', getResumeById)

export default router