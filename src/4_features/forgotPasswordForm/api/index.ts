import { createClient } from '@/6_shared/config/supabase'

export const sendForgotPasswordEmail = async (email: string) => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  })

  if (error) throw error

  return data
}
