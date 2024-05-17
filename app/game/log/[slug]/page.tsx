import { createClient } from "@/utils/supabase/server"
import { CreateGameDrive } from "../createGameDrive"
import { CreateGameDriveToggleOne } from "../createGameDriveTogglable";
import { redirect } from "next/navigation";
import { LogPlay } from "../logPlay";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient()

  const { data: game } = await supabase.from("games").select('*').eq("id", params.slug).single()
  const { data: publicUser } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", (await supabase.auth.getUser()).data.user?.id)
    .single()
  const { data: gameDrive } = await supabase
    .from("game_drives")
    .select("drive_in_game")
    .eq("id", publicUser.current_game_drive_id)
    .single()

  if (publicUser.current_game_drive_id) {
    const { data: teamQbs } = await supabase.from("team_qbs").select("*").eq("team_id", publicUser.current_team_id)

    if (teamQbs) {
      return (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Log Play</h1>
          <h2 className="text-neutral-700">Game: <span className="font-medium text-black">{game.name}</span>, Game Drive: <span className="font-medium text-black">{gameDrive?.drive_in_game}</span></h2>
          <CreateGameDriveToggleOne gameId={game.id} teamQbs={teamQbs} />
          <LogPlay gameId={game.id} gameDriveId={publicUser.current_game_drive_id} teamQbs={teamQbs} />
        </div>
      )
    }
  } else {
    const { data: teamQbs } = await supabase.from("team_qbs").select("*").eq("team_id", publicUser.current_team_id)

    if (teamQbs) {
      return (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Log Play</h1>
          <h2 className="font-medium">Game: {game.name}, Game Drive: No Drive Selected</h2>
          <CreateGameDrive gameId={game.id} teamQbs={teamQbs} />
        </div>
      )
    } else {
      redirect('/error')
    }
  }
}