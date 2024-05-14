import Link from "next/link";
import "./globals.css";
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import GetAllTeams from "./teams/userGetAllTeams";
import GetAllSeasons from "./seasons/teamGetAllSeasons";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()

  const { data: authUser } = await supabase.auth.getUser()

  if (authUser?.user) {
    let currentTeamId: string | number | readonly string[] | undefined;
    let currentTeamName;
    let allTeams: any[] = [];
    allTeams = await GetAllTeams();
    let currentSeasonId: string | number | readonly string[] | undefined;
    let currentSeasonName;
    let allSeasons: any[] = [];
    allSeasons = await GetAllSeasons();

    const { data: authUser } = await supabase.auth.getUser();

    if (authUser?.user) {
      const { data: currentTeamIdData, error: teamIdError } = await supabase
        .from("users")
        .select("current_team_id")
        .eq("auth_id", authUser.user.id)
        .single();

      if (teamIdError) {
        console.error("Error fetching current team ID:", teamIdError.message);
      } else {
        currentTeamId = currentTeamIdData?.current_team_id;
      }

      const { data: currentSeasonIdData, error: seasonIdError } = await supabase
        .from("users")
        .select("current_season_id")
        .eq("auth_id", authUser.user.id)
        .single();

      if (seasonIdError) {
        console.error("Error fetching current season ID:", seasonIdError.message);
      } else {
        currentSeasonId = currentSeasonIdData?.current_season_id;
      }

      const { data: currentTeamNameData, error: teamNameError } = await supabase
        .from("teams")
        .select("name")
        .eq("id", currentTeamId)
        .single();

      if (teamNameError) {
        console.error("Error fetching current team name:", teamNameError.message);
      } else {
        currentTeamName = currentTeamNameData?.name;
      }

      const { data: currentSeasonNameData, error: seasonNameError } = await supabase
        .from("seasons")
        .select("type, year")
        .eq("id", currentSeasonId)
        .single();

      if (seasonNameError) {
        console.error("Error fetching current season name:", seasonNameError.message);
      } else {
        currentSeasonName = currentSeasonNameData?.type + ' ' + currentSeasonNameData.year;
      }

      allTeams = allTeams.filter(team => team.id !== currentTeamId);
      allSeasons = allSeasons.filter(season => season.id !== currentSeasonId);

      return (
        <html lang="en" suppressHydrationWarning>
          <body className="container mx-auto px-2 flex flex-col">
            <nav className="border-b border-neutral-200 py-3 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div>
                  <Link href={"/"} className="flex gap-2 items-center">
                    <Image src="/qblogs_logo_lightmode.svg" alt="logo" width={32} height={32} />
                    <span className="font-medium">QB Logs</span>
                  </Link>
                </div>
                <div>
                  <select name="team" id="team" className="w-44 p-2" required>
                    {currentTeamId && (
                      <option value={currentTeamId}>
                        {currentTeamName}
                      </option>
                    )}
                    {allTeams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select name="season" id="season" className="w-44 p-2" required>
                    {currentSeasonId && (
                      <option value={currentSeasonId}>
                        {currentSeasonName}
                      </option>
                    )}
                    {allSeasons.map(season => (
                      <option key={season.id} value={season.id}>
                        {season.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4">
                <Link href={"/"}>Dashboard</Link>
                <Link href={"/team"}>My Team</Link>
                <Link href={"/"}>Settings</Link>
              </div>
            </nav>
            <div className="mt-4">
              {children}
            </div>
          </body>
        </html>
      );
    } else {
      return (
        <html lang="en" suppressHydrationWarning>
          <body className="container mx-auto px-4 sm:px-0">
            {children}
          </body>
        </html>
      );
    }
  }
}
