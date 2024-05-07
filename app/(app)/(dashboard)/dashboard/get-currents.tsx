import { createClient } from "@/utils/supabase/server"

export default async function GetCurrents() {
  const supabase = createClient()

  const { data } = await supabase
    .from('users')
    .select('*')
    .single()

  const { data: teamName } = await supabase
    .from('teams')
    .select('name')
    .eq('id', data?.current_team_id)
    .single()

  const { data: seasonName } = await supabase
    .from('seasons')
    .select('year, type')
    .eq('id', data?.current_season_id)
    .single()

  let seasonNameString = seasonName?.year + ' ' + seasonName?.type

  const { data: allUserTeams } = await supabase
    .from('members')
    .select('id, name')
    .eq('user_id', data?.id)

  return {
    currentTeamId: data?.current_team_id,
    currentTeamName: teamName?.name,
    currentSeasonId: data?.current_season_id,
    currentSeasonName: seasonNameString,
  }
}