import { createClient } from "@/utils/supabase/server"

export default async function GetAllSeasons() {
  const supabase = createClient()

  // Fetch the current user's current_team_id
  const { data: currentUser } = await supabase.from("users").select("current_team_id").single()

  // Fetch all seasons associated with the current team
  const { data: seasons } = await supabase
    .from("seasons")
    .select("id, type, year")
    .eq("team_id", currentUser?.current_team_id)

  // Map the fetched data to the desired format
  if (seasons) {
    const formattedSeasons = seasons.map(season => ({
      id: season.id,
      name: `${season.type} ${season.year}`
    }))

    return formattedSeasons
  }

  return []
}
