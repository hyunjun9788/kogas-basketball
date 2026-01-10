import { createClient } from '@/6_shared/config/supabase'

export const signOut = async () => {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) throw error
}
