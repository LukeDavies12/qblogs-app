import { Button } from "@/components/ui/button";
import * as table from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server"
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: game, error: gameError } = await supabase
    .from('games')
    .select('*')
    .eq('id', params.slug)
    .single();

  if (gameError) {
    throw gameError;
  }

  // Fetch the game drives
  const { data: gameDrives, error: drivesError } = await supabase
    .from('game_drives')
    .select('*')
    .eq('game_id', game.id);

  if (drivesError) {
    throw drivesError;
  }

  // Fetch the plays from the drives
  const { data: playsFromDrives, error: playsError } = await supabase
    .from('plays')
    .select('*')
    .in('game_drive_id', gameDrives.map(drive => drive.id));

  if (playsError) {
    throw playsError;
  }

  const gameDriveNums = await Promise.all(
    playsFromDrives.map(play =>
      supabase.from("game_drives").select("drive_in_game").eq("id", play.game_drive_id as string).single()
    )
  );

  // Fetch the quarterbacks details
  const qbIds = Array.from(new Set(playsFromDrives.map(play => play.qb_id)));
  const { data: qbs, error: qbsError } = await supabase
    .from('team_qbs')
    .select('id, full_name')
    .in('id', qbIds);

  if (qbsError) {
    throw qbsError;
  }

  const qbMap: Record<string, string> = qbs.reduce<Record<string, string>>((acc, qb) => {
    acc[qb.id] = qb.full_name;
    return acc;
  }, {});

  // Sort plays first by drive number then by play number
  const sortedPlays = playsFromDrives.map((play, index) => ({
    ...play,
    drive_in_game: gameDriveNums[index].data?.drive_in_game,
  })).sort((a, b) => {
    const aDrive = a.drive_in_game || 0;
    const bDrive = b.drive_in_game || 0;
    return aDrive - bDrive || a.num_in_drive - b.num_in_drive;
  });

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl">Plays for {game?.name}</h1>
      <table.Table className="mt-4">
        <table.TableCaption>List of all plays from drives.</table.TableCaption>
        <table.TableHeader>
          <table.TableRow>
            <table.TableHead>Drive #</table.TableHead>
            <table.TableHead>Play #</table.TableHead>
            <table.TableHead>Down</table.TableHead>
            <table.TableHead>Distance</table.TableHead>
            <table.TableHead>From the</table.TableHead>
            <table.TableHead>Result</table.TableHead>
            <table.TableHead>Yards</table.TableHead>
            <table.TableHead>QB</table.TableHead>
            <table.TableHead>ALL FIELDS</table.TableHead>
            <table.TableHead>UPDATE</table.TableHead>
          </table.TableRow>
        </table.TableHeader>
        <table.TableBody>
          {sortedPlays.map((play) => (
            <table.TableRow key={play.id}>
              <table.TableCell className="px-4 py-2">{play.drive_in_game}</table.TableCell>
              <table.TableCell className="px-4 py-2">{play.num_in_drive}</table.TableCell>
              <table.TableCell className="px-4 py-2">{play.down}</table.TableCell>
              <table.TableCell className="px-4 py-2">{play.distance}</table.TableCell>
              <table.TableCell className="px-4 py-2">{play.yard_line}</table.TableCell>
              <table.TableCell className="px-4 py-2">{play.type}</table.TableCell>
              <table.TableCell className="px-4 py-2">{play.yards}</table.TableCell>
              <table.TableCell className="px-4 py-2">{qbMap[play.qb_id]}</table.TableCell>
              <table.TableCell className="px-4 py-2"><Link href={`/play/${play.id}`}><Button variant={"link"}>View All Fields</Button></Link></table.TableCell>
              <table.TableCell className="px-4 py-2"><Link href={`/play/${play.id}/update`}><Button variant={"link"}>Update</Button></Link></table.TableCell>
            </table.TableRow>
          ))}
        </table.TableBody>
      </table.Table>
    </div>
  );
}
