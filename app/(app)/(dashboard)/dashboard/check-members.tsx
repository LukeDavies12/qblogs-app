import { createClient } from "@/utils/supabase/server"
import { User } from "@supabase/supabase-js"

export default async function CheckMembers() {
  const supabase = createClient()

  const { data } = await supabase
    .from('members')
    .select('id')

  if (data?.length === 0) {
    return false
  } else {
    return true
  }
}