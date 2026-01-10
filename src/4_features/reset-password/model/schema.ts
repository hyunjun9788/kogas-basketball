import { z } from 'zod'
import {
  passwordSchema,
  confirmPasswordRefine,
} from '@/6_shared/lib/validations'

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine(confirmPasswordRefine.validate, confirmPasswordRefine.params)

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
