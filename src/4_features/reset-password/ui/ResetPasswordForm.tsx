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
import { Input } from '@/6_shared/ui/Input'
import { Button } from '@/6_shared/ui/Button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { resetPassword } from '../api'
import { signOut } from '@/4_features/sign-out/api'
import { ResetPasswordFormValues, resetPasswordSchema } from '../model/schema'

export const ResetPasswordForm = () => {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPassword({ newPassword: data.password })

      await signOut()

      toast.success('비밀번호 변경 되었습니다! 👋', {
        duration: 3000,
      })

      router.push('/login')
    } catch (error: any) {
      toast.error('비밀번호 변경 실패', {
        description: '잠시 후 다시 시도해주세요',
      })
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>새 비밀번호</FormLabel>
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
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
        </div>
        <Button className="h-12 text-[16px]">비밀번호 변경하기</Button>
      </form>
    </Form>
  )
}
