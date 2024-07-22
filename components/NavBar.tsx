import { ModeToggleRadio } from "@/components/ModeToggleRadio";
import { UserDropdownMenu } from "@/components/UserDropdown";
import SeasonSelect from "./SeasonSelect";

export default function NavBar({ userData }: { userData: any }) {
  return (
    <nav className="py-3 flex items-center justify-between">
      <div className="flex gap-4 items-center justify-center">
        <span>{userData.currentTeamName}</span>
        <SeasonSelect currentSeasonId={userData.currentSeasonId} currentSeasonName={userData.currentSeasonName} allSeasons={userData.allSeasons} />
      </div>
      <div className="flex gap-2 items-center">
        <UserDropdownMenu />
        <ModeToggleRadio />
      </div>
    </nav>
  );
}