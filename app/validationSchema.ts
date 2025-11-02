// import { z } from 'zod';

// export const issueSchema = z.object({
//     title: z.string().min(3, 'Title is Required').max(100),
//     description: z.string().min(10, 'Description is Required').max(1000)
// });
// validationSchema.ts
import { z } from 'zod'

export const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required')
})

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required')
})