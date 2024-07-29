import { createClient } from "@/utils/supabase/server";
import { TeamUser } from "./TeamUser";

export const GetTeamUsers = async (teamId: string): Promise<TeamUser[]> => {
  const supabase = createClient();
  
  const query = supabase
    .from("users")
    .select('full_name, role, type')
    .eq('team_id', teamId)

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching team users:", error);
    return [];
  }

  return data.map(user => ({
    fullName: user.full_name,
    role: user.role,
    type: user.type
  }));
};