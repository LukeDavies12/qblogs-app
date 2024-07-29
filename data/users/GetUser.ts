import { createClient } from "@/utils/supabase/server";

export interface User {
  fullName: string | null;
  type: string | null;
  currentSeasonId: string | null;
  currentSeasonName: string | null;
  currentGameId: string | null;
  currentGameName: string | null;
  role: string | null;
  team: Team | null;
}

export const GetUser = async (): Promise<User | null> => {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("users")
    .select(`
      full_name,
      type,
      current_season_id,
      current_season_name,
      current_game_id,
      current_game_name,
      role,
      teams (
        id,
        name,
        users (
          full_name,
          role,
          type
        )
      )
    `)
    .eq("auth_id", (await supabase.auth.getUser()).data.user?.id as string)
    .single();

  if (error || !data) {
    console.error("Error fetching user data:", error);
    return null;
  }

  const user: User = {
    fullName: data.full_name,
    type: data.type,
    currentSeasonId: data.current_season_id,
    currentSeasonName: data.current_season_name,
    currentGameId: data.current_game_id,
    currentGameName: data.current_game_name,
    role: data.role,
    team: data.teams ? {
      id: data.teams.id,
      name: data.teams.name,
      teamMembers: data.teams.users.map((member: any) => ({
        fullName: member.full_name,
        role: member.role,
        type: member.type
      }))
    } : null
  };

  return user;
};