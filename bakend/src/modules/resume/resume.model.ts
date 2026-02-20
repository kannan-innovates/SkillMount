import mongoose, { Schema, Document } from 'mongoose'

export interface IResume extends Document {
     fileName: string
     fileType: 'pdf' | 'docx'
     rawText: string
     skills: string[]
     education: string[]
     experience: string[]
     location: string
     aiAnalysis?: object
     status: 'pending' | 'analyzed' | 'approved'
     createdAt: Date
}

const ResumeSchema = new Schema<IResume>(
     {
          fileName: { type: String, required: true },
          fileType: { type: String, enum: ['pdf', 'docx'], required: true },
          rawText: { type: String, required: true },
          skills: [String],
          education: [String],
          experience: [String],
          location: { type: String, default: '' },
          aiAnalysis: { type: Schema.Types.Mixed, default: null },
          status: { type: String, enum: ['pending', 'analyzed', 'approved'], default: 'pending' },
     },
     { timestamps: true }
)

export const Resume = mongoose.model<IResume>('Resume', ResumeSchema)