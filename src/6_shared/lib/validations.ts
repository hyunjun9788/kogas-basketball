import { z } from 'zod'

export const emailSchema = z
  .string()
  .refine((value) => /\S+@\S+\.\S+/.test(value), {
    message: '올바른 이메일 형식이 아닙니다.',
  })

export const passwordSchema = z
  .string()
  .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
  .regex(/[0-9]/, { message: '숫자를 포함해야 합니다.' })
  .regex(/[a-zA-Z]/, { message: '영문을 포함해야 합니다.' })
  .regex(/[!@#$%^&*]/, {
    message: '특수문자(!@#$%^&*)를 포함해야 합니다.',
  })

export const confirmPasswordRefine = {
  validate: (data: { password: string; confirmPassword: string }) =>
    data.password === data.confirmPassword,
  params: {
    path: ['confirmPassword'] as string[],
    message: '비밀번호가 일치하지 않습니다.',
  },
}
