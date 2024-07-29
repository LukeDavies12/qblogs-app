"use client"

import { useFormStatus } from "react-dom";
import { CreateSpringGameAction } from "./gameAction";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CreateSpringGame() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold">Create New Spring Game</h3>
      <form className="flex flex-col gap-1" action={CreateSpringGameAction}>
        <Label htmlFor="name">Name</Label>
        <Input type="text" name="name" id="name" placeholder="2024 Spring Game" required />
        <Label htmlFor="date">Full Name</Label>
        <Input type="date" name="date" id="date" required />
        <SubmitButton />
      </form>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full mt-2' type="submit" disabled={pending}>
      {pending ? "Creating" : "Create"} New Spring Game
    </Button>
  );
}