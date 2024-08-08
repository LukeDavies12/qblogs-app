"use client"

import LogoSpanNoText from "@/components/brand/LogoSpanNoText";
import { ModeToggleRadio } from "@/components/theme/ModeToggleRadio";
import { Button } from "@/components/ui/button";
import { UserDropdownMenu } from "@/components/ui/UserDropdown";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/about", label: "My Seasons" },
    { href: "/team", label: "My Team" },
  ];

  return (
    <nav className="py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <LogoSpanNoText />
        <div className="ml-6 flex items-center gap-2">
        {links.map(({ href, label }) => (
          <Link key={href} href={href}>
            <Button 
              variant="link" 
              className={`px-2 ${pathname === href ? 'underline underline-offset-4' : ''}`}
            >
              {label}
            </Button>
          </Link>
        ))}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <UserDropdownMenu />
        <ModeToggleRadio />
      </div>
    </nav>
  );
}