import LogoSpanNoText from "@/components/brand/LogoSpanNoText";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalendarFold, Group, Home } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="min-h-screen w-12 md:w-16 flex flex-col gap-4 items-center py-4 border-r border-neutral-200 dark:border-neutral-800">
      <LogoSpanNoText />
      <SidebarItem href="/" icon={<Home className="h-5 w-5" />} tooltip="Dashboard" />
      <SidebarItem href="/season" icon={<CalendarFold className="h-5 w-5" />} tooltip="Current Season" />
      <SidebarItem href="/team" icon={<Group className="h-5 w-5" />} tooltip="My Team" />
    </div>
  );
}

function SidebarItem({ href, icon, tooltip }: { href: string; icon: React.ReactNode; tooltip: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href}>
            <Button variant="outline" size="icon">
              {icon}
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}