import { createClient } from "@/utils/supabase/server"

export default async function GetAllTeams() {
  const supabase = createClient()

  // Fetch all team IDs
  const { data: teamIds } = await supabase.from("members").select("team_id")

  // Map team IDs to team names
  if (teamIds) {
    const teams = await Promise.all(teamIds.map(async (team) => {
      const { data: teamData, error } = await supabase.from("teams").select("name").eq('id', team.team_id).single()

      if (error) {
        // Handle error if any
        console.error("Error fetching team name:", error.message)
        return null
      }

      return {
        id: team.team_id,
        name: teamData.name
      }
    }))

    // Filter out any null values (in case of errors)
    return teams.filter(team => team !== null)
  } else {
    return []
  }
}
