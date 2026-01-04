'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/6_shared/ui/Form'
import { SignUpFormValues, signUpSchema } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/6_shared/ui/Input'
import { useForm } from 'react-hook-form'
import { Button } from '@/6_shared/ui/Button'
import { checkNicknameDuplicate, signUp } from '../api'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { toast } from 'sonner'

export const SignUpForm = () => {
  const router = useRouter()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      isNicknameVerified: false,
    },
  })
  const isNicknameVerified = form.watch('isNicknameVerified')
  const handleNicknameCheck = async (value: string) => {
    const nickname = form.getValues('nickname')

    if (!nickname) {
      form.setError('nickname', {
        message: '닉네임은 2글자 이상이어야 합니다.',
      })
      return
    }

    const isDuplicate = await checkNicknameDuplicate(value)
    if (isDuplicate) {
      console.log(isDuplicate)
      form.setError('nickname', {
        type: 'manual',
        message: '이미 사용중인 닉네임입니다😢',
      })
      form.setValue('isNicknameVerified', false)
    } else {
      form.clearErrors('nickname')
      form.setValue('isNicknameVerified', true)
    }
  }

  const onSubmit = async (data: SignUpFormValues) => {
    console.log('회원가입 요청 데이터:', data)

    try {
      await signUp({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      })
      toast.success('회원가입을 축하합니다! 🎉', {
        duration: 3000,
      })
      router.push('/')
    } catch (error: any) {
      toast.error('회원가입에 실패했습니다😢', {
        description: error.message || '잠시 후 다시 시도해주세요.',
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
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="ex) 엔젤란겔"
                      className="text-4 h-12.5 md:text-sm"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        if (form.getValues('isNicknameVerified')) {
                          form.setValue('isNicknameVerified', false)
                          form.clearErrors('nickname')
                        }
                      }}
                    />
                    <Button
                      type="button"
                      className="h-full text-[16pxr]"
                      disabled={isNicknameVerified}
                      onClick={() => handleNicknameCheck(field.value)}
                    >
                      중복 확인
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
                {isNicknameVerified && (
                  <p className="mt-1 text-sm font-medium text-green-600">
                    사용 가능한 닉네임입니다! 🎉
                  </p>
                )}
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호 재입력"
                    className="text-4 h-12.5 md:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="h-12 text-[16px]">회원가입</Button>
      </form>
    </Form>
  )
}
