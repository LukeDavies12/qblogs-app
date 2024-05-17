import Link from "next/link";
import "./globals.css";
import { createClient } from "@/utils/supabase/server"
import GetAllTeams from "./teams/userGetAllTeams";
import GetAllSeasons from "./seasons/teamGetAllSeasons";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeToggleRadio } from "@/components/ModeToggleRadio";
import { Button } from "@/components/ui/button";
import LogoSpanNoText from "@/components/LogoSpanNoText";
import { Group, CalendarFold, Home } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup
} from "@/components/ui/select"
import { UserDropdownMenu } from "@/components/UserDropdown";

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
          <body className="bg-gray-100 dark:bg-gray-900">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex">
                <div className="min-h-screen bg-white dark:bg-gray-950 w-12 md:w-16 flex flex-col gap-4 items-center py-4">
                  <LogoSpanNoText />
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={"/"}>
                          <Button variant="outline" size="icon">
                            <Home className="h-5 w-5" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Dashboard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={"/season"}>
                          <Button variant="outline" size="icon">
                            <CalendarFold className="h-5 w-5" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Current Season</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={"/team"}>
                          <Button variant="outline" size="icon">
                            <Group className="h-5 w-5" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>My Team</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="w-full container px-4 mx-auto">
                  <nav className="py-3 flex items-center justify-between">
                    <div className="flex gap-4 items-center justify-center">
                      <Select defaultValue={currentTeamId?.toString()} name="team">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Team" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Teams</SelectLabel>
                            {currentTeamId && (
                              <SelectItem value={currentTeamId.toString()}>
                                {currentTeamName}
                              </SelectItem>
                            )}
                            {allTeams.map(team => (
                              <SelectItem key={team.id} value={team.id}>
                                {team.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Select defaultValue={currentSeasonId?.toString()} name="season">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a Season" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Seasons</SelectLabel>
                            {currentSeasonId && (
                              <SelectItem value={currentSeasonId.toString()}>
                                {currentSeasonName}
                              </SelectItem>
                            )}
                            {allSeasons.map(season => (
                              <SelectItem key={season.id} value={season.id}>
                                {season.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 items-center">
                      <UserDropdownMenu />
                      <ModeToggleRadio />
                    </div>
                  </nav>
                  <div className="mt-4">
                    {children}
                  </div>
                </div>
              </div>
            </ThemeProvider>
          </body>
        </html>
      );
    } else {
      return (
        <html lang="en" suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <body className="container mx-auto px-4 sm:px-0">
              {children}
            </body>
          </ThemeProvider>
        </html>
      );
    }
  }
}
