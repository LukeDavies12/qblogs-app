import { createClient } from "@/utils/supabase/server";
import { User } from "./User";

export const GetUser = async (): Promise<{ user: User } | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select(`
      type,
      full_name,
      current_season_id,
      current_season_name,
      team_id,
      team_name,
      current_game_id,
      current_game_name,
      role
    `)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    user: {
      fullName: data.full_name,
      type: data.type,
      currentSeasonId: data.current_season_id,
      currentSeasonName: data.current_season_name,
      teamId: data.team_id,
      teamName: data.team_name,
      currentGameId: data.current_game_id,
      currentGameName: data.current_game_name,
      role: data.role
    },
  };
};
