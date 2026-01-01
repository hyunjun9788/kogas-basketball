'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/6_shared/ui/Form'
import { SignUpFormValues, signUpSchema } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/6_shared/ui/Input'
import { useForm } from 'react-hook-form'
import { Button } from '@/6_shared/ui/Button'

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-20 flex h-full w-full flex-col"
      >
        <div className="mb-5 flex flex-1 flex-col gap-5">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex) 엔젤란겔"
                    className="text-4 h-12.5 md:text-sm"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
                    placeholder="8자 이상 입력"
                    className="text-4 h-12.5 md:text-sm"
                    {...field}
                  />
                </FormControl>
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
                    placeholder="비밀번호 재입력"
                    className="text-4 h-12.5 md:text-sm"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button className="h-12 text-[16px]">회원가입</Button>
      </form>
    </Form>
  )
}
