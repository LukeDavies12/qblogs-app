import { createClient } from "@/utils/supabase/server"
import { User } from "@supabase/supabase-js"

export default async function CheckMembers({ user }: { user: User | null }) {
  const supabase = createClient()

  const { data } = await supabase
    .from('members')
    .select('id')
    .eq('user_id', user?.id as string)

  if (data?.length === 0) {
    return false
  } else {
    return true
  }
}