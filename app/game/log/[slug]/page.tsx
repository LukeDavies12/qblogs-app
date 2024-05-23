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
    .eq("auth_id", (await supabase.auth.getUser()).data.user?.id as string)
    .single()
  const { data: gameDrive } = await supabase
    .from("game_drives")
    .select("drive_in_game")
    .eq("id", publicUser?.current_game_drive_id as string)
    .single()

  if (publicUser?.current_game_drive_id) {
    const { data: teamQbs } = await supabase.from("team_qbs").select("*").eq("team_id", publicUser?.current_team_id as string)

    if (teamQbs) {
      return (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">Log Play</h1>
          <h2 className="text-muted-foreground">Game: <span className="font-medium text-foreground">{game?.name}</span>, Game Drive: <span className="font-medium text-foreground">{gameDrive?.drive_in_game}</span></h2>
          <CreateGameDriveToggleOne gameId={game?.id as string} teamQbs={teamQbs} />
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
          <h2 className="font-medium">Game: {game?.name}, Game Drive: No Drive Selected</h2>
          <CreateGameDrive gameId={game?.id as string} teamQbs={teamQbs} />
        </div>
      )
    } else {
      redirect('/error')
    }
  }
}