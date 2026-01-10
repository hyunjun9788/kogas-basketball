import { LoginForm } from '@/4_features/login'
import { KogasIcon } from '@/6_shared/assets/images'

export default function LoginPage() {
  return (
    <div className="flex h-full flex-col items-center p-6">
      <div className="flex flex-col items-center">
        <KogasIcon className="h-50 w-50" />

        <h1 className="text-main mb-2 text-3xl font-bold">로그인</h1>
        <p className="flex flex-col items-center text-gray-500">
          <span>대구 한국가스공사 팬 커뮤니티에 오신 것을</span>
          <span>환영합니다</span>
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
