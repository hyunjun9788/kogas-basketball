import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().refine((value) => /\S+@\S+\.\S+/.test(value), {
    message: '올바른 이메일 형식이 아닙니다.',
  }),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
