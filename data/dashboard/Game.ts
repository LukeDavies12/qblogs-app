export interface Game {
  id: string
  date: Date
  name: string
  seasonId: string | null
  isSpringGame: boolean | null
}