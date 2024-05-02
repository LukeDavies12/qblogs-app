import UserFullName from './user-full-name'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import CheckMembers from './check-members'
import CreateTeam from './create-team'

export default async function Page() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (await CheckMembers({ user }) === false) {
    if(!user) return null
    
    return (
      <>
        <div className='flex items-center gap-2 font-medium text-lg'>
          Welcome {<UserFullName user={user} />}, it looks like you
          don&apos;t have a team setup yet. Let&apos;s get started!
        </div>
        <br />
        <CreateTeam uid={user.id}  />
      </>
    )
  } else {
    const { data: teamData, error: teamError } = await supabase
      .from('members')
      .select('team_id')
      .eq('user_id', user?.id as string)
      .single()

    const { data: teamNameData, error: teamNameError } = await supabase
      .from('teams')
      .select('name')
      .eq('id', teamData?.team_id)
      .single()

    return (
      <>
        <div className='flex items-center gap-2 font-medium text-lg'>
          {teamNameData?.name}
        </div>
        <br />
        <div className='flex'>
          <div className='lg:w-1/2'>
            <h2 className='font-medium'>Seasons</h2>
          </div>
          <div className='lg:w-1/2'>
            <h2 className='font-medium'>Spring Balls</h2>
          </div>
        </div>
      </>
    )
  }
}