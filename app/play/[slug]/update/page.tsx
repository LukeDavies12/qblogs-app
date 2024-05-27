import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import DeletePlay from "../../deletePlay";
import UpdatePlay from "../../updatePlay";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();

  const { data: play, error: playError } = await supabase
    .from('plays')
    .select('*')
    .eq('id', params.slug)
    .single();

  const { data: qb, error: qbError } = await supabase
    .from('team_qbs')
    .select('full_name')
    .eq('id', play?.qb_id as string)
    .single();

  const { data: gameDrive, error: gameDriveError } = await supabase
    .from('game_drives')
    .select('game_id, drive_in_game')
    .eq('id', play?.game_drive_id as string)
    .single();

  const { data: game, error: gameError2 } = await supabase
    .from('games')
    .select('name, id')
    .eq('id', gameDrive?.game_id as string)
    .single();

  // get current public user
  const { data: publicUser } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", (await supabase.auth.getUser()).data.user?.id as string)
    .single()

  // all team qbs for a dropdown in the UpdatePlay component so all team qbs where 
  const { data: teamQbs } = await supabase.from("team_qbs").select("*").eq("team_id", publicUser?.current_team_id as string)

  if (!play || playError) return <div>Error loading play details.</div>;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl">
        Drive {gameDrive?.drive_in_game} Play {play?.num_in_drive} from {game?.name}
      </h1>
      <UpdatePlay playId={play.id} playToUpdate={play} teamQbs={teamQbs} />
      <DeletePlay playId={play.id} gameId={game?.id as string} />
      <Link href={`/game/plays/${game?.id}`}><Button variant={"link"} className="w-full">View All Plays from {game?.name}</Button></Link>
    </div>
  );
}
