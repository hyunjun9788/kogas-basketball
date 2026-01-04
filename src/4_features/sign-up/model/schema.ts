import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z.string().refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: '올바른 이메일 형식이 아닙니다.',
    }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
      .regex(/[0-9]/, { message: '숫자를 포함해야 합니다.' })
      .regex(/[a-zA-Z]/, { message: '영문을 포함해야 합니다.' })
      .regex(/[!@#$%^&*]/, {
        message: '특수문자(!@#$%^&*)를 포함해야 합니다.',
      }),
    confirmPassword: z.string(),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 2글자 이상이어야 합니다.' }),
    isNicknameVerified: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  })
  .refine((data) => data.isNicknameVerified === true, {
    path: ['nickname'],
    message: '닉네임 중복 확인을 해주세요.',
  })

export type SignUpFormValues = z.infer<typeof signUpSchema>
