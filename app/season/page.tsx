import { createClient } from "@/utils/supabase/server";
import CreateSpringGame from "../games/createSpringGame";
import { BtnLink } from "@/components/BtnLink";
import DeleteGame from "../game/deleteGame";

export default async function Page() {
  const supabase = createClient();

  const { data: publicUser } = await supabase.from("users").select("*").eq("auth_id", (await supabase.auth.getUser()).data.user?.id).single();
  const { data: currentSeason } = await supabase.from("seasons").select("*").eq("id", publicUser?.current_season_id).single();

  if (currentSeason.type == "Spring") {
    const { data: springGame } = await supabase.from("games").select("*").eq("season_id", currentSeason.id).single();

    if (springGame) {
      return (
        <div className="flex flex-col gap-2">
          <h1 className="font-bold">{currentSeason.type} {currentSeason.year}</h1>
          <h2 className="font-medium">Game</h2>
          <div className="bg-white shadow rounded-md p-4 flex gap-4 items-center justify-between md:w-1/2">
            <div>
              <span className="text-gray-800 font-semibold">{springGame.name}</span>
              <span className="text-gray-500"> {springGame.date}</span>
            </div>
            <div>
              <BtnLink text="Log Plays" href={`/game/log/${springGame.id}`} extraStyles="mr-4" />
              <DeleteGame gameId={springGame.id} />
            </div>
          </div>
        </div>
      )
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
        <h1 className="font-bold">{currentSeason.type} {currentSeason.year}</h1>
        <h2 className="font-medium">Game</h2>
      </div>
    )
  }
}