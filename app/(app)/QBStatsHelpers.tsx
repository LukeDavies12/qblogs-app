import { SupabaseClient } from '@supabase/supabase-js';

export type QBStat = {
  qbId: string;
  qbName: string;
  yardsGained: number;
  totalYardsAvailable: number;
  avgAvailableYdsPerc: number;
  ptsPerDrive: string;
  executionPercentage: number;
  readPercentage: number;
  completionPercentage: number;
  adjustedCompletionPercentage: number;
  attempts: number;
  completions: number;
  adjustedCompletions: number;
  expPlays: number;
  tenPlusPlays: number;
  fivePlusPlays: number;
  turnoverWorthyPlayPercentage: number;
  turnoverWorthyPlays: number;
  playMaxedCount: number;
  playMaxedCounting: number;
  playReadCount: number;
  playReadCounting: number;
  allPlaysCount: number;
  passingTds: number;
  passingYards: number;
  passingYardsPerAtt: number;
  rushingTds: number;
  rushingYards: number;
  rushingYardsPerAtt: number;
};

export async function fetchQBStats(supabase: SupabaseClient): Promise<QBStat[]> {
  const { data: currentSeason } = await supabase
    .from("users")
    .select('current_season_id, current_team_id')
    .single();

  const [{ data: allSeasonGames }, { data: allTeamQbs }, { data: allGameDrives }, { data: allPlaysForDrives }] = await Promise.all([
    supabase.from("games").select("*").eq("season_id", currentSeason.current_season_id),
    supabase.from("team_qbs").select("*").eq("team_id", currentSeason.current_team_id),
    supabase.from("game_drives").select("*").eq("season_id", currentSeason.current_season_id),
    supabase.from("plays").select("*").eq("season_id", currentSeason.current_season_id)
  ]);

  // Process the data and calculate stats here
  // ...

  return processedQBStats;
}

// Add helper functions for calculations with appropriate type annotations
function calculatePercentage(num: number, denom: number): string {
  return (denom > 0 ? (num / denom) * 100 : 0).toFixed(2);
}

// Add more helper functions as needed