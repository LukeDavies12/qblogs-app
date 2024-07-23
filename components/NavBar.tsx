import { ModeToggleRadio } from "@/components/ModeToggleRadio";
import { UserDropdownMenu } from "@/components/UserDropdown";

export default function NavBar() {
  return (
    <nav className="py-2 flex items-center justify-end">
      <div className="flex gap-2 items-center">
        <UserDropdownMenu />
        <ModeToggleRadio />
      </div>
    </nav>
  );
}