import UserInfo from './user-info'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <UserInfo user={user} />

      <form action="/signout" method="post">
        <Button type="submit">
          Sign out
        </Button>
      </form>
    </>
  )
}