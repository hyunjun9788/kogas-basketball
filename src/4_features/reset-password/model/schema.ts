import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
      .regex(/[0-9]/, { message: '숫자를 포함해야 합니다.' })
      .regex(/[a-zA-Z]/, { message: '영문을 포함해야 합니다.' })
      .regex(/[!@#$%^&*]/, {
        message: '특수문자(!@#$%^&*)를 포함해야 합니다.',
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  })

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
