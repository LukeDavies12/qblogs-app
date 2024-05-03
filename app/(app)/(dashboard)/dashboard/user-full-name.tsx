import { createClient } from "@/utils/supabase/server"

export default async function UserFullName() {
  const supabase = createClient()

  const { data } = await supabase
    .from('users')
    .select('full_name')
    .single()

  return (
    <>
      {data?.full_name}
    </>
  )
}