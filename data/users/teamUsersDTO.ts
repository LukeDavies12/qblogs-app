import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function getAllTeamUsersDTO() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: publicUser } = await supabase
    .from("users")
    .select("team_id")
    .eq("user_id", user.id)
    .single();

  if (!publicUser?.team_id) {
    throw new Error("User not associated with a team");
  }

  const { data: teamUsers } = await supabase
    .from("users")
    .select(`
      id,
      full_name,
      type,
      user_roles (
        role
      )
    `)
    .eq("team_id", publicUser.team_id);

  if (!teamUsers) {
    return [];
  }

  return teamUsers.map(user => ({
    full_name: user.full_name,
    type: user.type,
    role: user.user_roles?.[0]?.role
  }));
}