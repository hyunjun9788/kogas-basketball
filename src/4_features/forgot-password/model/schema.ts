import { z } from 'zod'
import { emailSchema } from '@/6_shared/lib/validations'

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
