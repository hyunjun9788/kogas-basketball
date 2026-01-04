import { supabase } from '@/6_shared/config/supabase'
import { SignUpParams } from '../model/types'

export const signUp = async ({ email, password, nickname }: SignUpParams) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) throw authError

  if (authData.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      nickname: nickname,
    })

    if (profileError) {
      console.error('프로필 생성 실패:', profileError)
    }
  }
  return authData
}

export const checkNicknameDuplicate = async (nickname: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('nickname', nickname)
    .maybeSingle()

  if (error) {
    throw error
  }

  return !!data
}
