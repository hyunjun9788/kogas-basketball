import { createClient } from '@/6_shared/config/supabase'
import { LoginFormValues } from '../model/types'

export const login = async ({ email, password }: LoginFormValues) => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error

  return data
}
