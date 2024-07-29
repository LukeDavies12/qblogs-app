import { ModeToggleRadio } from "@/components/ModeToggleRadio";
import { UserDropdownMenu } from "@/components/UserDropdown";
import LogoSpanNoText from "@/components/brand/LogoSpanNoText";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar() {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/about", label: "My Seasons" },
    { href: "/team", label: "My Team" },
  ]
  return (
    <nav className="py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <LogoSpanNoText />
        {links.map(({ href, label }) => (
          <Link key={href} href={href}><Button variant={"link"} className="px-2">{label}</Button></Link>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <UserDropdownMenu />
        <ModeToggleRadio />
      </div>
    </nav>
  );
}