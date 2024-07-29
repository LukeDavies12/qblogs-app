import { createClient } from "@/utils/supabase/server";

export const GetSeasonData = async (current_season_id: string | null) => {
  if (!current_season_id) return null;

  const supabase = createClient();
  
  const { data, error } = await supabase
    .from("seasons")  // Assuming you have a 'seasons' table
    .select(`
      id,
      name,
      start_date,
      end_date
    `)
    .eq('id', current_season_id)
    .single();

  if (error || !data) {
    console.error("Error fetching season data:", error);
    return null;
  }

  return {
    season: {
      id: data.id,
      name: data.name,
      startDate: data.start_date,
      endDate: data.end_date,
    },
  };
};