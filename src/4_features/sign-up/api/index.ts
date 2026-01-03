import { supabase } from '@/6_shared/config/supabase'
import { SignUpParams } from '../model/types'

export const signUp = async ({ email, password, nickname }: SignUpParams) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) throw error
  return data
}
