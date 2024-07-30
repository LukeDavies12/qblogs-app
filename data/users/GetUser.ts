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

export interface Team {
  id: string;
  name: string | null;
  teamMembers: TeamMember[];
}

export interface TeamMember {
  fullName: string;
  role: "admin" | "standard" | "limited";
  type: "QB" | "Head Coach" | "Offensive Coordinator" | "Pass Game Coordinator" | "Defensive Coordinator" | "Special Teams Coordinator" | "OL Coach" | "Run Game Coordinator" | "QB Coach" | "RB Coach" | "WR Coach";
  team_id?: string;
}

export const GetUser = async (): Promise<User | null> => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error("No authenticated user found");
    return null;
  }

  // Parallelize database queries
  const [userDataResult, teamDataResult, teamMembersResult] = await Promise.all([
    supabase
      .from("users")
      .select(`
        full_name,
        type,
        current_season_id,
        current_season_name,
        current_game_id,
        current_game_name,
        role,
        team_id
      `)
      .eq("auth_id", user.id)
      .single(),
    
    supabase
      .from("teams")
      .select(`
        id,
        name
      `),
    
    supabase
      .from("users")
      .select("full_name, role, type, team_id")
  ]);

  const { data: userData, error: userError } = userDataResult;
  if (userError || !userData) {
    console.error("Error fetching user data:", userError);
    return null;
  }

  let teamData = null;
  let teamMembers: TeamMember[] = [];

  if (userData.team_id) {
    const { data: fetchedTeamData, error: teamError } = teamDataResult;
    if (teamError) {
      console.error("Error fetching team data:", teamError);
    } else {
      teamData = fetchedTeamData.find(team => team.id === userData.team_id) || null;
    }

    const { data: fetchedTeamMembers, error: teamMembersError } = teamMembersResult;
    if (teamMembersError) {
      console.error("Error fetching team members:", teamMembersError);
    } else {
      teamMembers = (fetchedTeamMembers || [])
        .filter(member => member.team_id === userData.team_id)
        .map(member => ({
          fullName: member.full_name,
          role: member.role as TeamMember['role'],
          type: member.type as TeamMember['type']
        }));
    }
  }

  const userObject: User = {
    fullName: userData.full_name,
    type: userData.type,
    currentSeasonId: userData.current_season_id,
    currentSeasonName: userData.current_season_name,
    currentGameId: userData.current_game_id,
    currentGameName: userData.current_game_name,
    role: userData.role,
    team: teamData ? {
      id: teamData.id,
      name: teamData.name,
      teamMembers
    } : null
  };

  return userObject;
};