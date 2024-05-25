"use client"

import { useFormStatus } from "react-dom";
import { CreateNewMember } from "./action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as select from "@/components/ui/select";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:w-1/2">
      <h1 className="font-bold">Create New Member</h1>
      <p className="text-muted-foreground -mt-3">Create an account for a new Coach or QB on your team.
        Once created give this person their login details and remind them to reset their password immediately.</p>
      <form className="flex flex-col gap-3" action={CreateNewMember}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="text" name="email" id="email" placeholder="tombrady@patriots.com" required />
        </div>
        <div>
          <Label htmlFor="full_name">Full Name</Label>
          <Input type="text" name="full_name" id="full_name" placeholder="Tom Brady" required />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <select.Select name="title" required>
            <select.SelectTrigger tabIndex={0} id="title">
              <select.SelectValue placeholder="Choose Their Title" />
            </select.SelectTrigger>
            <select.SelectContent>
              <select.SelectItem value="QB">QB</select.SelectItem>
              <select.SelectItem value="Head Coach">Head Coach</select.SelectItem>
              <select.SelectItem value="Offensive Coordinator">Offensive Coordinator</select.SelectItem>
              <select.SelectItem value="Pass Game Coordinator">Pass Game Coordinator</select.SelectItem>
              <select.SelectItem value="Run Game Coordinator">Run Game Coordinator</select.SelectItem>
              <select.SelectItem value="QB Coach">QB Coach</select.SelectItem>
              <select.SelectItem value="RB Coach">RB Coach</select.SelectItem>
              <select.SelectItem value="WR Coach">WR Coach</select.SelectItem>
              <select.SelectItem value="OL Coach">OL Coach</select.SelectItem>
            </select.SelectContent>
          </select.Select>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="************" required />
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full mt-2' type="submit" disabled={pending}>
      {pending ? "Creating" : "Create"} New Member
    </Button>
  );
};