import { z } from 'zod'
import { emailSchema, passwordSchema } from '@/6_shared/lib/validations'

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export type LoginFormValues = z.infer<typeof loginSchema>
