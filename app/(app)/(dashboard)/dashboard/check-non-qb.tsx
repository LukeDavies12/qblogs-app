import { createClient } from "@/utils/supabase/server"

export default async function IsNonQBUserAndNeedsSpringSeason() {
  const supabase = createClient()

  const { data } = await supabase
    .from('users')
    .select('type')

  const { data: teamData } = await supabase
    .from('users')
    .select('current_team_id')
    .single()

  const { data: springSeasonData } = await supabase
    .from('spring_season')
    .select('year')
    .eq('team_id', teamData?.current_team_id as string)
    .single()

  if (data?.some(user => user.type === 'QB' && springSeasonData?.year !== new Date().getFullYear().toString())) {
    return false
  } else {
    return true
  }
}