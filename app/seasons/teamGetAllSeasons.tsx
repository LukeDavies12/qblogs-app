import { createClient } from "@/utils/supabase/server"

export default async function GetAllSeasons() {
  const supabase = createClient()

  // Fetch the current user's current_team_id
  const { data: currentUser } = await supabase.from("users").select("current_team_id").single()

  // Fetch all seasons associated with the current team
  const { data: seasons } = await supabase
    .from("seasons")
    .select("id, type, year")
    .eq("team_id", currentUser?.current_team_id as string)

  // Map the fetched data to the desired format
  if (seasons) {
    const formattedSeasons = seasons.map(season => ({
      name: `${season.type} ${season.year}`,
      year: season.year,
      type: season.type,
      id: season.id,
    }))

    return formattedSeasons
  }

  return []
}
