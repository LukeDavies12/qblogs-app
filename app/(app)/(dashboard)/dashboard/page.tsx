import UserFullName from './user-full-name'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import CheckMembers from './check-members'

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (await CheckMembers({ user }) === false) {
    return (
      <>
        <div className='flex items-center gap-2 font-medium text-lg'>
          Welcome {<UserFullName user={user} />}, it looks like you
          don&apos;t have a team setup yet. Let&apos;s get started!
        </div>
        <br />
      </>
    )
  } else {
    return (
      <>
        has a team
        <br />
        <form action="/signout" method="post">
          <Button type="submit" variant={"secondary"}>
            Sign out
          </Button>
        </form>
      </>
    )
  }
}