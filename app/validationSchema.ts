import { z } from 'zod';

export const issueSchema = z.object({
    title: z.string().min(3, 'Title is Required').max(100),
    description: z.string().min(10, 'Description is Required').max(1000)
});
