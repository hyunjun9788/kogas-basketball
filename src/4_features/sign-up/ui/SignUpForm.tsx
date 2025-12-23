'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/6_shared/ui/form'
import { SignUpFormValues, signUpSchema } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/6_shared/ui/input'
import { useForm } from 'react-hook-form'

export const SignUpForm = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  })
  const onSubmit = (data: SignUpFormValues) => {
    console.log('회원가입 요청 데이터:', data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  placeholder="user@example.com"
                  className="text-[16px] md:text-sm"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
