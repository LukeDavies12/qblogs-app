import { createClient } from "@/utils/supabase/server"

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