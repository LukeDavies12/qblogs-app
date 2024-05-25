import { createClient } from "@/utils/supabase/server";
import CreateSpringGame from "../games/createSpringGame";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import DeleteGame from "../game/deleteGame";
import { Button } from "@/components/ui/button";


export default async function Page() {
  const supabase = createClient();

  const { data: publicUser } = await supabase.from("users").select("*").eq("auth_id", (await supabase.auth.getUser()).data.user?.id as string).single();
  const { data: currentSeason } = await supabase.from("seasons").select("*").eq("id", publicUser?.current_season_id as string).single();

  if (currentSeason?.type == "Spring") {
    const { data: springGame } = await supabase.from("games").select("*").eq("season_id", currentSeason.id).single();

    if (springGame) {
      const { data: springGameDrives } = await supabase.from("game_drives").select("*").eq("game_id", springGame.id);

      return (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">{currentSeason?.type} {currentSeason?.year}</h1>
          <Table className="md:w-1/2">
            <TableCaption>All Games for your current season.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Game</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Log Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{springGame.name}</TableCell>
                <TableCell>{springGame.date}</TableCell>
                <TableCell><Link href={`/game/log/${springGame.id}`}><Button variant={"link"}>Log Plays</Button></Link></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">{currentSeason.type} {currentSeason.year}</h1>
          <h2 className="font-medium">Game</h2>
          <CreateSpringGame />
        </div>
      )
    }
  } else {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">{currentSeason?.type} {currentSeason?.year}</h1>
        <h2 className="font-medium">Game</h2>
      </div>
    )
  }
}