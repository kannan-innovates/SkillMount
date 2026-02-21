
import { Router } from 'express'
import {
  createVaultEntryController,
  getAllVaultEntriesController,
  getVaultByResumeController,
} from './admin-vault.controller'

const router = Router()

router.post('/', createVaultEntryController)
router.get('/', getAllVaultEntriesController)
router.get('/resume/:resumeId', getVaultByResumeController)

export default router