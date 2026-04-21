import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email({ error: 'Please enter a valid email address' }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  _trap: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
