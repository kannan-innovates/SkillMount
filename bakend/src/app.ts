import express from 'express';
import cors from 'cors';

import resumeRoutes from './modules/resume/resume.routes'
import aiAnalysisRoutes from './modules/ai-analysis/ai-analysis.routes';
import skillGapRoutes from './modules/skill-gap/skill-gap.routes';
import careerPivotRoutes from './modules/career-pivot/career-pivot.routes';
import adminVaultRoutes from './modules/admin-vault/admin-vault.routes';
import jobRoutes from './modules/job-recommendation/job-recommendation.routes';
import cvTailoringRoutes from './modules/cv-tailoring/cv-tailoring.routes'

const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/resumes', resumeRoutes);
app.use('/api/analysis', aiAnalysisRoutes);
app.use('/api/skill-gap', skillGapRoutes);
app.use('/api/career-pivot', careerPivotRoutes);
app.use('/api/admin-vault', adminVaultRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/cv', cvTailoringRoutes);


// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

export default app