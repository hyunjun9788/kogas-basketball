import { SignUpSection } from '3_widgets/sign-up-section'
import { KogasIcon } from '@/6_shared/assets/images'

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center p-6">
      <KogasIcon className="h-50 w-50" />

      <div className="flex flex-col items-center">
        <h1 className="mb-2 text-3xl font-bold">회원가입</h1>
        <p className="text-gray-500">
          대구 한국가스공사 팬 커뮤니티에 오신 것을 환영합니다
        </p>
      </div>
      <SignUpSection />
    </div>
  )
}
