import { createClient } from "@/utils/supabase/server"
import { User } from "@supabase/supabase-js"

export default async function UserInfo({ user }: { user: User | null }) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('users')
    .select('full_name')
    .eq('auth_id', user?.id as string)
    .single()

  if (error) {
    throw error
  }

  return (
    <div>
      {data?.full_name}
    </div>
  )
}