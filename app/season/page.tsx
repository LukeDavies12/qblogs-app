import { createClient } from "@/utils/supabase/server";
import CreateSpringGame from "../games/createSpringGame";
import Link from "next/link";

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
          <div className="bg-white shadow rounded-md p-4 flex gap-4 items-center md:w-1/2">
            <div>
              <span className="text-gray-800 font-semibold">{springGame.name}</span>
              <span className="text-gray-500"> {springGame.date}</span>
            </div>
            <div className="flex-grow"></div> {/* Empty div for spacing */}
            <Link href={"/game/log"}><button>Log Plays</button></Link>
            <button className="text-white bg-red-700" type="submit">Delete</button>
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