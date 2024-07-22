import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SeasonSelect({ currentSeasonId, currentSeasonName, allSeasons }: { currentSeasonId: string, currentSeasonName: string, allSeasons: any[] }) {
  return (
    <Select defaultValue={currentSeasonId?.toString()} name="season">
      <SelectTrigger>
        <SelectValue placeholder="Select a Season" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Seasons</SelectLabel>
          {currentSeasonId && (
            <SelectItem value={currentSeasonId.toString()}>
              {currentSeasonName}
            </SelectItem>
          )}
          {allSeasons.map(season => (
            <SelectItem key={season.id} value={season.id}>
              {season.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}