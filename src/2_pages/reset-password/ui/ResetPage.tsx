import { ResetPasswordForm } from '@/4_features/reset-password/ui/ResetPasswordForm'
import { KogasIcon } from '@/6_shared/assets/images'

export const ResetPasswordPage = () => {
  return (
    <div className="flex h-full flex-col items-center p-6">
      <div className="flex flex-col items-center">
        <KogasIcon className="h-50 w-50" />

        <h1 className="text-main mb-2 text-3xl font-bold">새 비밀번호 설정</h1>
        <p className="flex flex-col items-center text-gray-500">
          계정에 사용할 새로운 비밀번호를 입력해주세요
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  )
}
