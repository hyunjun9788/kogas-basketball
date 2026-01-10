'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ForgotPasswordFormValues, forgotPasswordSchema } from '../model/schema'
import { sendForgotPasswordEmail } from '../api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/6_shared/ui/Form'
import { Input } from '@/6_shared/ui/Input'
import { Button } from '@/6_shared/ui/Button'

export const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await sendForgotPasswordEmail(data.email)
    } catch (error: any) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-20 w-full">
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
              <span className="text-muted-foreground text-sm">
                가입하신 이메일 주소를 입력해주세요
              </span>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-10 h-12 w-full text-[16px]">
          재설정 링크 보내기
        </Button>
      </form>
    </Form>
  )
}
