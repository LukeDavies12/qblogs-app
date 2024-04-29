import LogoSpan from "./logo-span"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import SignOutBtn from "../auth/log-out-btn";
import { Settings, DollarSign } from "lucide-react";
import Link from "next/link";

export default function DashboardNavbar({ full_name }: { full_name: string }) {
  function getInitials(name: string) {
    if (!name) return '';
    const nameArray = name.split(' ');
    let initials = '';
    for (let i = 0; i < nameArray.length; i++) {
      initials += nameArray[i].charAt(0).toUpperCase();
    }
    return initials;
  }
  let userInitials = getInitials(full_name);

  if (!full_name) {
    userInitials = ('Acc')
  }

  return (
    <div className="border-b w-full">
      <nav className="container mx-auto px-4 flex justify-between items-center py-4">
        <div>
          <LogoSpan />
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/dashboard"}>
                <DropdownMenuItem className="cursor-pointer">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Billing
                </DropdownMenuItem>
              </Link>
              <Link href={"/dashboard"}>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <SignOutBtn />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
}