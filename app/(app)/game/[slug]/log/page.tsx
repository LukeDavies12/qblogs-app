import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CreateGameDrive } from "./createGameDrive";
import { CreateGameDriveToggleOne } from "./createGameDriveTogglable";
import { LogPlay } from "./logPlay";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  const { data: game } = await supabase.from("games").select('*').eq("id", params.slug).single()
  const { data: publicUser } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", (await supabase.auth.getUser()).data.user?.id as string)
    .single()
  const { data: gameDrive } = await supabase
    .from("game_drives")
    .select("drive_in_game")
    .eq("id", publicUser?.current_game_drive_id as string)
    .single()
  const { data: gameDrives } = await supabase
    .from("game_drives")
    .select("*")
    .eq("game_id", game?.id as string)
    .order("drive_in_game", { ascending: true });

  if (publicUser?.current_game_drive_id) {
    const { data: teamQbs } = await supabase.from("team_qbs").select("*").eq("team_id", publicUser?.current_team_id as string)

    if (teamQbs) {
      return (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Log Play</h1>
          <ul className="list-none p-0 m-0 text-neutral-900">
            <li>Game: <span className="font-medium">{game?.name}</span></li>
            <li>Game Drive: <span className="font-medium">{gameDrive?.drive_in_game}</span></li>
          </ul>
          <div>
            <CreateGameDriveToggleOne gameId={game?.id as string} teamQbs={teamQbs} />
          </div>
          <LogPlay gameId={game?.id as string} gameDriveId={publicUser.current_game_drive_id} teamQbs={teamQbs} />
        </div>
      )
    }
  } else {
    const { data: teamQbs } = await supabase.from("team_qbs").select("*").eq("team_id", publicUser?.current_team_id as string)

    if (teamQbs) {
      return (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Log Play</h1>
          <ul className="list-none p-0 m-0 text-neutral-900">
            <li>Game: <span className="font-medium">{game?.name}</span></li>
            <li>Game Drive: <span className="font-medium">No Drive Selected</span></li>
          </ul>
          <CreateGameDrive gameId={game?.id as string} teamQbs={teamQbs} />
        </div>
      )
    } else {
      redirect('/error')
    }
  }
}