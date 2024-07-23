import GetAllSeasons from "@/app/seasons/teamGetAllSeasons";
import { createClient } from "@/utils/supabase/server";

export async function layoutUserDTO() {
  const supabase = createClient();
  const { data: { user }} = await supabase.auth.getUser();
  let currentTeamId, currentTeamName, currentSeasonId, currentSeasonName;
  let allSeasons = await GetAllSeasons();

  const { data: currentTeamIdData } = await supabase
    .from("users")
    .select("current_team_id")
    .eq("auth_id", user?.id)
    .single();
  currentTeamId = currentTeamIdData?.current_team_id;

  const { data: currentSeasonIdData } = await supabase
    .from("users")
    .select("current_season_id")
    .eq("auth_id", user?.id)
    .single();
  currentSeasonId = currentSeasonIdData?.current_season_id;

  const { data: currentTeamNameData } = await supabase
    .from("teams")
    .select("name")
    .eq("id", currentTeamId)
    .single();
  currentTeamName = currentTeamNameData?.name;

  const { data: currentSeasonNameData } = await supabase
    .from("seasons")
    .select("type, year")
    .eq("id", currentSeasonId)
    .single();
  currentSeasonName = currentSeasonNameData
    ? `${currentSeasonNameData.type} ${currentSeasonNameData.year}`
    : "";

  allSeasons = allSeasons
    .filter((season) => season.id !== currentSeasonId)

  return {
    currentTeamName,
    currentSeasonName,
    currentSeasonId,
    allSeasons
  };
}
