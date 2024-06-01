import LogoSpan from "@/components/LogoSpan";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import calculatePoints from "@/config/calcPoints";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { StatDisplay, TextStat } from "./homePageStats";
import CreateSeason from "./seasons/createSeason";

export default async function Page() {
  const supabase = createClient();

  const { data: authUser } = await supabase.auth.getUser();
  if (!authUser?.user) {
    return (
      <div className="flex flex-col gap-4 mt-4 ml-4">
        <div className="flex gap-2 items-center select-none cursor-default">
          <LogoSpan />
        </div>
        <div className="flex gap-4">
          <Link href={"/login"}><Button variant={"outline"}>Login</Button></Link>
        </div>
        {/* <div> space for demo youtube video for alpha </div> */}
      </div>
    );
  }

  const { data: publicUserCurrentSeason } = await supabase.from("users").select('*').eq("auth_id", authUser.user.id).single();

  if (!publicUserCurrentSeason?.current_season_id) {
    return <CreateSeason />;
  }

  const { data: allSeasonGames } = await supabase.from("games").select("*").eq("season_id", publicUserCurrentSeason.current_season_id);
  const { data: allTeamQbs } = await supabase.from("team_qbs").select("*").eq("team_id", publicUserCurrentSeason.current_team_id as string);
  const gameIds = allSeasonGames?.map(game => game.id) || [];
  const { data: allGameDrives } = await supabase.from("game_drives").select("*").in("game_id", gameIds);
  const { data: allPlaysForDrives } = await supabase.from("plays").select("*").in("game_drive_id", allGameDrives?.map(drive => drive.id) || []);

  const calculatePercentage = (num: number, denom: number) => (denom > 0 ? (num / denom) * 100 : 0).toFixed(2);

  const qbStats = allTeamQbs?.map(qb => {
    const qbDrives = allGameDrives?.filter(drive => drive.qb_id === qb.id) || [];
    const qbPlays = allPlaysForDrives?.filter(play => play.qb_id === qb.id) || [];
    const calculateTotal = (drives: any[], key: string) =>
      drives.reduce((acc, drive) => {
        const value = Number(drive[key]);
        return !isNaN(value) ? acc + value : acc;
      }, 0);
    const avgAvailableYdsPerc = qbDrives.length > 0
      ? qbDrives.reduce((acc, drive) => {
        const start = Number(drive.start);
        const end = Number(drive.end);
        if (!isNaN(start) && !isNaN(end)) {
          const availableYdsPerc = (start - end) / start;
          return acc + availableYdsPerc;
        } else {
          return acc;
        }
      }, 0) / qbDrives.length
      : 0;
    const totalYardsGained = calculateTotal(qbDrives, "start") - calculateTotal(qbDrives, "end");
    const totalYardsAvailable = calculateTotal(qbDrives, "start");
    const ptsPerDrive = qbDrives.length ? qbDrives.reduce((acc, drive) => acc + calculatePoints(drive.result || ""), 0) / qbDrives.length : 0; const executionPercentage = parseFloat(calculatePercentage(
      qbPlays.filter(play => play.qb_play_yn === "Yes").length,
      qbPlays.length - qbPlays.filter(play => play.qb_play_yn === "NA").length
    ));
    const readPercentage = parseFloat(
      calculatePercentage(
        qbPlays.filter(play => play.qb_read_yn === "Yes").length,
        qbPlays.length - qbPlays.filter(play => play.qb_read_yn === "NA").length
      ));
    const completions = qbPlays.filter(play => play.type === "Complete").length;
    const attempts = qbPlays.filter(play => ["Complete", "Incomplete", "Interception", "Incomplete Drop"].includes(play.type)).length;
    const completionPercentage = parseFloat(calculatePercentage(completions, attempts));
    const adjustedCompletionPercentage = parseFloat(calculatePercentage(completions + qbPlays.filter(play => play.type === "Incomplete Drop").length, attempts));
    const expPlays = qbPlays.filter(play => ["Complete", "QB Rush"].includes(play.type) && Number(play.yards) >= 25).length;
    const tenPlusPlays = qbPlays.filter(play => ["Complete", "QB Rush"].includes(play.type) && Number(play.yards) >= 10).length;
    const fivePlusPlays = qbPlays.filter(play => ["Complete", "QB Rush"].includes(play.type) && Number(play.yards) >= 5).length;
    const turnoverWorthyPlays = qbPlays.filter(play => play.turnover_worthy_play === "Yes").length;
    const turnoverWorthyPlayPercentage = parseFloat(calculatePercentage(turnoverWorthyPlays, qbPlays.length));
    const formatNumber = (num) => {
      const formatted = Number(num).toFixed(2);
      return formatted.endsWith('.00') ? formatted.split('.')[0] : formatted;
    };
    
    const passingTds = qbDrives.filter(drive => drive.result === "TD Pass").length;
    const passingYards = qbPlays.filter(play => play.type === "Complete").reduce((acc, play) => acc + Number(play.yards), 0);
    const passingYardsPerAtt = attempts > 0 ? passingYards / attempts : 0;
    const rushingTds = qbDrives.filter(drive => drive.result === "TD Run QB").length;
    const rushingYards = qbPlays.filter(play => play.type === "QB Rush").reduce((acc, play) => acc + Number(play.yards), 0);
    const rushingAttempts = qbPlays.filter(play => play.type === "QB Rush").length;
    const rushingYardsPerAtt = rushingAttempts > 0 ? rushingYards / rushingAttempts : 0;
    
    

    return {
      qbId: qb.id,
      qbName: qb.full_name,
      yardsGained: totalYardsGained,
      totalYardsAvailable,
      avgAvailableYdsPerc,
      ptsPerDrive: ptsPerDrive.toFixed(2),
      executionPercentage,
      readPercentage,
      completionPercentage,
      adjustedCompletionPercentage,
      attempts,
      completions,
      adjustedCompletions: completions + qbPlays.filter(play => play.type === "Incomplete Drop").length,
      expPlays,
      tenPlusPlays,
      fivePlusPlays,
      turnoverWorthyPlayPercentage,
      turnoverWorthyPlays,
      playMaxedCount: qbPlays.filter(play => play.qb_play_yn === "Yes").length,
      playMaxedCounting: qbPlays.length - qbPlays.filter(play => play.qb_play_yn === "NA").length,
      playReadCount: qbPlays.filter(play => play.qb_read_yn === "Yes").length,
      playReadCounting: qbPlays.length - qbPlays.filter(play => play.qb_read_yn === "NA").length,
      allPlaysCount: qbPlays.length,
      passingTds,
      passingYards,
      passingYardsPerAtt,
      rushingTds,
      rushingYards,
      rushingYardsPerAtt
    };
  });

  // Sort qbStats by number of plays (allPlaysCount) in descending order
  qbStats?.sort((a, b) => b.allPlaysCount - a.allPlaysCount);

  return (
    <div>
      <h1 className="font-bold">Dashboard</h1>
      <h2 className="font-medium">For All Games this Season</h2>
      <div className="space-y-4 md:grid grid-cols-2 gap-2 w-full">
        {qbStats?.map(stat => (
          <div key={stat.qbId} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold">{stat.qbName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 -mt-4">
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  <StatDisplay
                    value={stat.avgAvailableYdsPerc * 100}
                    max={100}
                    text={`${stat.yardsGained} yds / ${stat.totalYardsAvailable} yds`}
                    subtext="Avg Available Yards Gained per Drive %"
                  />
                  <StatDisplay
                    value={parseFloat(stat.ptsPerDrive)}
                    max={7}
                    text={stat.ptsPerDrive + " pts / 7 pts"}
                    subtext="Avg Points Per Drive"
                  />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  <StatDisplay
                    value={stat.executionPercentage}
                    max={100}
                    text={`${stat.playMaxedCount} / ${stat.playMaxedCounting}`}
                    subtext="Avg Play Maxed %"
                  />
                  <StatDisplay
                    value={stat.readPercentage}
                    max={100}
                    text={`${stat.playReadCount} / ${stat.playReadCounting}`}
                    subtext="Avg Play Read %"
                  />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  <StatDisplay
                    value={stat.adjustedCompletionPercentage}
                    max={100}
                    text={`${stat.adjustedCompletions} / ${stat.attempts}`}
                    subtext="Adjusted Completion %"
                  />
                  <StatDisplay
                    value={stat.completionPercentage}
                    max={100}
                    text={`${stat.completions} / ${stat.attempts}`}
                    subtext="Completion %"
                  />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                  <TextStat value={stat.expPlays} subtext="Explosive Plays Responsible For" />
                  <TextStat value={stat.tenPlusPlays} subtext="10+ Yards Plays Responsible For" />
                  <StatDisplay
                    value={stat.turnoverWorthyPlayPercentage}
                    max={100}
                    text={`${stat.turnoverWorthyPlays} / ${stat.allPlaysCount}`}
                    subtext="Turnover Worthy Play %"
                  />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <TextStat value={stat.passingTds} subtext="Passing TDs" />
                  <TextStat value={stat.passingYards} subtext="Passing Yards" />
                  <TextStat value={stat.passingYardsPerAtt} subtext="Yards Per Att" />
                  <TextStat value={stat.rushingTds} subtext="Rushing TD" />
                  <TextStat value={stat.rushingYards} subtext="Rushing Yards" />
                  <TextStat value={stat.rushingYardsPerAtt} subtext="Rusing Yard Per Att" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
