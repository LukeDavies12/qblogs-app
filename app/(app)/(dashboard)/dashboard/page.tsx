import UserInfo from './user-info'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import CheckMembers from './check-members'

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const checkMembers = await CheckMembers({ user })

  if (checkMembers === false) {
    return (
      <>
        <UserInfo user={user} />
        <h2>no team</h2>
        <form action="/signout" method="post">
          <Button type="submit">
            Sign out
          </Button>
        </form>
      </>
    )
  } else {
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
}