import { z } from 'zod'
import {
  emailSchema,
  passwordSchema,
  confirmPasswordRefine,
} from '@/6_shared/lib/validations'

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 2글자 이상이어야 합니다.' }),
    isNicknameVerified: z.boolean(),
  })
  .refine(confirmPasswordRefine.validate, confirmPasswordRefine.params)
  .refine((data) => data.isNicknameVerified === true, {
    path: ['nickname'],
    message: '닉네임 중복 확인을 해주세요.',
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>
