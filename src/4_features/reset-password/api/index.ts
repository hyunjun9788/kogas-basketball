import { createClient } from '@/6_shared/config/supabase'

export const resetPassword = async ({
  newPassword,
}: {
  newPassword: string
}) => {
  const supabase = createClient()

  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) throw error

  return data
}
