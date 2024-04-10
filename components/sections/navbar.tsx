import LogoSpan from "./logo-span";
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="container px-4 mx-auto my-3">
      <nav className="flex justify-between items-center py-4">
        <div>
          <LogoSpan />
        </div>
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
          <Link href={"/sign-in"}><Button variant={"link"}>Sign In</Button></Link>
          <Link href={"/sign-up"}><Button variant={"default"}>Sign Up</Button></Link>
        </div>
      </nav>
    </div>
  );
}