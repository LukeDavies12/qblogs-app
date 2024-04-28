import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "../ui/icons"
import Link from 'next/link'
import { ModeToggleRadio } from "../theme/mode-toggle-radio"

export default function Footer() {
  return (
    <div className="container mx-auto px-4 flex justify-end items-center pt-8">
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
      <ModeToggleRadio />
    </div>
  )
}