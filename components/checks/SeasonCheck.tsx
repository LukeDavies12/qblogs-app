import CreateSeason from "@/components/seasons/createSeason";
import { SupabaseClient } from '@supabase/supabase-js';

type SeasonCheckProps = {
  supabase: SupabaseClient;
  userId: string;
  children: React.ReactNode;
};

export async function SeasonCheck({ supabase, userId, children }: SeasonCheckProps) {
  const { data: publicUserCurrentSeason } = await supabase
    .from("users")
    .select('current_season_id')
    .eq("auth_id", userId)
    .single();

  if (!publicUserCurrentSeason?.current_season_id) {
    return <CreateSeason />;
  }

  return <>{children}</>;
}