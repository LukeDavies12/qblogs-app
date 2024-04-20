import LogoSpan from "./logo-span"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ModeToggle } from "../theme/mode-toggle"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "../ui/icons"

export default function Navbar() {
  return (
    <div className="container px-4 mx-auto my-1">
      <nav className="flex justify-between items-center py-4">
        <div>
          <LogoSpan />
        </div>
        <div className="flex items-center">
          <Link href={"/login"}><Button variant={"link"}>Login</Button></Link>
          <Link href={"/sign-up"} className="mr-2"><Button variant={"default"}>Sign Up</Button></Link>
          <Link href={siteConfig.links.youtube} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.youtube className="h-5 w-5 fill-current" />
              <span className="sr-only">Youtube</span>
            </div>
          </Link>
          <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.twitter className="h-3 w-3 fill-current" />
              <span className="sr-only">Twitter</span>
            </div>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}