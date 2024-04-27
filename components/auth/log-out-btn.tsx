"use client";

import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function SignOutBtn() {
  return (
    <form action="/signout" method="post" className="w-full text-left">
      <MenuBtn />
    </form>
  );
}

const MenuBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full px-0" variant={"ghost"}>
      <DropdownMenuItem className="cursor-pointer w-full">
        <LogOut className="mr-2 h-4 w-4" />
        Log{pending ? "ing" : ""} out
      </DropdownMenuItem>
    </Button>
  )
}