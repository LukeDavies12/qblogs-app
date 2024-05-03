"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { CreateSpringSeasonAction } from "./spring-season-action";

export default function CreateSpringSeason() {
  return (
    <form action={CreateSpringSeasonAction}>
      <CreateSpringSeasonBtn />
    </form>
  );
}

export const CreateSpringSeasonBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full mt-4" type="submit" disabled={pending} variant={"outline"}>
      Creat{pending ? "ing" : "e"} Spring Season
    </Button>
  );
};