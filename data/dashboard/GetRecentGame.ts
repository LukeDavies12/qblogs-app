import { createClient } from "@/utils/supabase/server";
import { Game } from "./Game";

export const GetMostRecentGame = async (currentSeasonId: string): Promise<{ game: Game } | null> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("games")
    .select(`
      id,
      date,
      season_id,
      name,
      spring_game
    `)
    .eq('season_id', currentSeasonId)
    .order('date', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    game: {
      id: data.id,
      date: new Date(data.date),
      seasonId: data.season_id,
      name: data.name,
      isSpringGame: data.spring_game,
    },
  };
};