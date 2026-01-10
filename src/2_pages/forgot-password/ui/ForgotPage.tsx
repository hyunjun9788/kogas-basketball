import { ForgotPasswordSection } from '3_widgets/forgot-password/ui/ForgotPasswordSection'
import { KogasIcon } from '@/6_shared/assets/images'

export default function ForgotPage() {
  return (
    <div className="flex h-full flex-col items-center p-6">
      <div className="flex flex-col items-center">
        <KogasIcon className="h-50 w-50" />

        <h1 className="text-main mb-3 text-3xl font-bold">비밀번호 찾기</h1>
        <p className="flex flex-col items-center text-gray-500">
          <span> 가입하신 이메일 주소로</span>
          <span>비밀번호 재설정 링크를 보내드립니다</span>
        </p>
      </div>
      <ForgotPasswordSection />
      <div className="mt-10 flex gap-2 bg-gray-100 p-5">
        <div>이미지</div>
        <div>
          <div className="text-main text-xl">이메일을 확인하세요</div>
          <div>링크를 받으신 후 10분 이내에 비밀번호를 재설정해주세요</div>
        </div>
      </div>
    </div>
  )
}
