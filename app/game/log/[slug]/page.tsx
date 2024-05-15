import { createClient } from "@/utils/supabase/server"
import CreateGameDrive from "../createGameDrive"

export default async function Page({ params }: { params: { slug: string } }) {
  const supabse = createClient()

  const { data: game} = await supabse.from("games").select('*').eq("id", params.slug).single()
  const { data: publicUser } = await supabse
    .from("users")
    .select("*")
    .eq("auth_id", (await supabse.auth.getUser()).data.user?.id)
    .single()
  const { data: gameDrive } = await supabse
    .from("game_drives")
    .select("*")
    .eq("game_id", game.id)
    .single()

  if (publicUser.current_game_drive_id) {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">Log Play</h1>
        <h2 className="font-medium">Game: {game.name}, Game Drive: {gameDrive.drive_in_game}</h2>
        {/* button to toggle form to create new game_drive */}
        <CreateGameDrive />
        {/* form to log play, server action takes in game_drive_id from users current set */}
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-2">
        <h1 className="font-bold">Log Play</h1>
        <h2 className="font-medium">Game: {game.name}, Game Drive: No Drive Selected</h2>
        <CreateGameDrive />
      </div>
    )
  }
}