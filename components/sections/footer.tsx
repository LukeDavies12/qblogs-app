import { ModeToggle } from "../theme/mode-toggle";
import { Icons } from "../ui/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="container px-4 mx-auto py-4">
      <footer className="flex justify-end">
        <div className="flex space-x-3 items-center">
          {/* <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 px-0"
              )}
            >
              <Icons.gitHub className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link> */}
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
      </footer>
    </div>
  );
}