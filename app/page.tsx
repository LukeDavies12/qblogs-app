import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import CreateSeason from "./seasons/createSeason"
import { Button } from "@/components/ui/button"
import LogoSpan from "@/components/LogoSpan"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


export default async function Page() {
  const supabase = createClient()

  const { data: authUser } = await supabase.auth.getUser()
  if (authUser?.user) {
    const { data: publicUserCurrentSeason } = await supabase.from("users").select('*').eq("auth_id", authUser.user.id).single()

    if (publicUserCurrentSeason?.current_season_id) {
      const { data: allSeasonGames } = await supabase.from("games").select("*").eq("season_id", publicUserCurrentSeason.current_season_id)
      const { data: allTeamQbs } = await supabase.from("team_qbs").select("*").eq("team_id", publicUserCurrentSeason.current_team_id as string)
      const gameIds = allSeasonGames?.map(game => game.id) || [];
      const { data: allGameDrives } = await supabase
        .from("game_drives")
        .select("*")
        .in("game_id", gameIds);
      const { data: allPlaysForDrives } = await supabase
        .from("plays")
        .select("*")
        .in("game_drive_id", allGameDrives?.map(drive => drive.id) || []);

      const qbStats = allTeamQbs?.map(qb => {
        const qbDrives = allGameDrives?.filter(drive => drive.qb_id === qb.id);
        const qbPlays = allPlaysForDrives?.filter(play => play.qb_id === qb.id);

        if (qbDrives && qbPlays) {
          const avgAvailableYdsPerc = qbDrives.length > 0
            ? qbDrives.reduce((acc, drive) => {
              const start = Number(drive.start);
              const end = Number(drive.end);
              if (!isNaN(start) && !isNaN(end)) {
                const availableYdsPerc = (start - end) / start;
                console.log(`Drive Start: ${start}, Drive End: ${end}, Available Yds Perc: ${availableYdsPerc}`);
                return acc + availableYdsPerc;
              } else {
                console.error(`Invalid start or end for drive: ${JSON.stringify(drive)}`);
                return acc;
              }
            }, 0) / qbDrives.length
            : 0;

          const ptsPerDrive = qbDrives.length > 0
            ? qbDrives.reduce((acc, drive) => {
              const points = calculatePoints(drive.result);
              if (typeof points === 'number') {
                return acc + points;
              } else {
                // Handle the case where points is not a number
                return acc;
              }
            }, 0) / qbDrives.length
            : 0;

          const executionPercentage = qbPlays.length > 0
            ? qbPlays.filter(play => play.qb_play_yn === 'Yes').length / qbPlays.length
            : 0;

          const readPercentage = qbPlays.length > 0
            ? qbPlays.filter(play => play.qb_read_yn === 'Yes').length / qbPlays.length
            : 0;

          const completions = qbPlays.filter(play => play.type === 'Complete').length;
          const attempts = qbPlays.filter(play => ['Complete', 'Incomplete', 'Interception'].includes(play.type)).length;

          const completionPercentage = attempts > 0
            ? completions / attempts
            : 0;

          const adjustedCompletionPercentage = attempts > 0
            ? (completions + qbPlays.filter(play => play.type === 'Incomplete Drop').length) / attempts
            : 0;

          const explosivePasses = qbPlays.filter(play => Number(play.yards) >= 20).length;

          const passes10PlusYards = qbPlays.filter(play => Number(play.yards) >= 10).length;

          const turnoverWorthyPlays = qbPlays.filter(play => play.turnover_worthy_play === 'Yes').length;

          const turnoverWorthyPlayPercentage = qbPlays.length > 0
            ? turnoverWorthyPlays / qbPlays.length
            : 0;

          return {
            qbId: qb.id,
            qbName: qb.full_name,
            avgAvailableYdsPerc: avgAvailableYdsPerc.toFixed(2),
            ptsPerDrive: ptsPerDrive.toFixed(2),
            executionPercentage: (executionPercentage * 100).toFixed(2),
            readPercentage: (readPercentage * 100).toFixed(2),
            completionPercentage: (completionPercentage * 100).toFixed(2),
            adjustedCompletionPercentage: (adjustedCompletionPercentage * 100).toFixed(2),
            explosivePasses,
            passes10PlusYards,
            turnoverWorthyPlayPercentage: (turnoverWorthyPlayPercentage * 100).toFixed(2),
          };
        }
      });

      return (
        <div>
          <h1 className="font-bold text-xl">Dashboard</h1>
          <h2 className="font-medium mt-1 text-lg">For All Games this Season</h2>
          <div>
            <ul className="space-y-4">
              {qbStats?.map(stat => (
                <li key={stat?.qbId}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{stat?.qbName}</CardTitle>
                      <CardDescription>{`QB ID: ${stat?.qbId}`}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <p>Average Available Yards Percentage</p>
                        <Progress value={parseFloat(stat?.avgAvailableYdsPerc || '0')} max={100} />
                        <p>{`${stat?.avgAvailableYdsPerc}%`}</p>
                      </div>
                      <div>
                        <p>Points Per Drive</p>
                        <Progress value={parseFloat(stat?.ptsPerDrive || '0')} max={7} />

                        <p>{stat?.ptsPerDrive}</p>
                      </div>
                      <div>
                        <p>Execution Percentage</p>
                        <Progress value={parseFloat(stat?.executionPercentage || '0')} max={100} />

                        <p>{`${stat?.executionPercentage}%`}</p>
                      </div>
                      <div>
                        <p>Read Percentage</p>
                        <Progress value={parseFloat(stat?.readPercentage || '0')} max={100} />

                        <p>{`${stat?.readPercentage}%`}</p>
                      </div>
                      <div>
                        <p>Completion Percentage</p>
                        <Progress value={parseFloat(stat?.completionPercentage || '0')} max={100} />
                        <p>{`${stat?.completionPercentage}%`}</p>
                      </div>
                      <div>
                        <p>Adjusted Completion Percentage</p>
                        <Progress value={parseFloat(stat?.adjustedCompletionPercentage || '0')} max={100} />
                        <p>{`${stat?.adjustedCompletionPercentage}%`}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Explosive Passes</p>
                        <p>{stat?.explosivePasses}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>10+ Yards Passes</p>
                        <p>{stat?.passes10PlusYards}</p>
                      </div>
                      <div>
                        <p>Turnover Worthy Play Percentage</p>
                        <Progress value={parseFloat(stat?.turnoverWorthyPlayPercentage || '0' )} max={100} />
                        <p>{`${stat?.turnoverWorthyPlayPercentage}%`}</p>
                      </div>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    } else {
      return (
        <CreateSeason />
      )
    }
  } else {
    return (
      <div className="flex flex-col gap-4 mt-4 ml-4">
        <div className="flex gap-2 items-center select-none cursor-default">
          <LogoSpan />
        </div>
        <div className="flex gap-4">
          <Link href={"/login"}><Button variant={"outline"}>Login</Button></Link>
        </div>
        <div>
          space for demo youtube video for alpha
        </div>
      </div>
    )
  }
}

function calculatePoints(result: any) {
  switch (result) {
    case "TD Pass":
    case "TD Run":
      return 7;
    case "Field Goal Made":
      return 3;
    case "Field Goal Missed":
      return 3;
    case "Safety":
      return -2;
    default:
      return 0;
  }
}