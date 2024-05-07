'use-client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Settings } from "lucide-react";
import Link from "next/link";
import SignOutBtn from "../../../../components/auth/log-out-btn";
import LogoSpan from "../../../../components/sections/logo-span";
import GetCurrents from "./get-currents";

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

  let teamAndSeasonData = GetCurrents();

  return (
    <div className="border-b w-full">
      <nav className="container mx-auto px-4 flex justify-between items-center py-4">
        <div>
          <LogoSpan />
          <form action="">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </form>
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