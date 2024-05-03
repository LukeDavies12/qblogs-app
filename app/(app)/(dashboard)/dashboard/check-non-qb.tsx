import { createClient } from "@/utils/supabase/server"

export default async function IsNonQBUserAndNeedsSpringSeason() {
  const supabase = createClient()

  const { data } = await supabase
    .from('users')
    .select('type')

    const { data: userData } = await supabase.from("users").select("current_team_id").single();

  const { data: springSeasonData } = await supabase
    .from('spring_seasons')
    .select('year')
    .eq('team_id', userData?.current_team_id as string)
    .single()

  if (data?.some(user => user.type === 'QB')) {
    return false
  } else {
    if (springSeasonData?.year) {
      return false
    }
    return true
  }
}