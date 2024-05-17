"use client"

import * as React from "react"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useFormStatus } from "react-dom"


export function UserDropdownMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Link href={'/settings'}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action="/auth/logout" method="post" className="w-full text-left">
          <MenuBtn />
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MenuBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full px-0 py-2" variant={"ghost"}>
      <DropdownMenuItem className="cursor-pointer w-full">
        Log{pending ? "ing" : ""} out
      </DropdownMenuItem>
    </Button>
  )
}