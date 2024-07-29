export interface User {
  fullName: string;
  type: string;
  currentSeasonId: string | null;
  currentSeasonName: string | null;
  teamId: string | null;
  teamName: string | null;
  currentGameId: string | null;
  currentGameName: string | null;
  role: string;
}