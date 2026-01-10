'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/6_shared/ui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../model/schema'
import { Input } from '@/6_shared/ui/Input'
import { Button } from '@/6_shared/ui/Button'
import Link from 'next/link'
import { LoginFormValues } from '../model/schema'
import { login } from '../api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data)

      toast.success('로그인 되었습니다! 👋', {
        duration: 3000,
      })

      router.push('/')
    } catch (error: any) {
      if (error.message === 'Invalid login credentials') {
        form.setError('password', {
          type: 'manual',
          message: '이메일 또는 비밀번호를 확인해주세요',
        })
      } else {
        toast.error('로그인 실패', {
          description: '잠시 후 다시 시도해주세요',
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-20 flex h-full w-full flex-col"
      >
        <div className="mb-5 flex flex-1 flex-col gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="user@example.com"
                    className="text-4 h-12.5 md:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="8자 이상 입력"
                    className="text-4 h-12.5 md:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between gap-2">
            <Link href="/forgot-password" className="text-main font-medium">
              비밀번호 찾기
            </Link>
            <div>
              <span className="mr-2 text-gray-500">계정이 없으신가요?</span>
              <Link
                href="/sign-up"
                className="text-main text-[16px] font-medium"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          className="h-12 text-[16px]"
        >
          {form.formState.isSubmitting ? '처리 중...' : '로그인'}
        </Button>
      </form>
    </Form>
  )
}
