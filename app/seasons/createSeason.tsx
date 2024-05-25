"use client"

import Image from "next/image"
import { useFormStatus } from "react-dom";
import { CreateSeasonAction } from "./sznAction";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as select from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CreateSeason() {
  return (
    <>
      <div className="flex flex-col items-center gap-4 mt-4 md:w-1/2">
        <div className="flex flex-col gap-4">
          <p className="text-lg">It looks like you are just setting up QB Logs, let&apos;s create a season to work with.</p>
          <h1 className="font-bold text-2xl text-center">New Season</h1>
        </div>
        <div>
          <form action={CreateSeasonAction}>
            <div className="flex flex-col gap-1">
              <Label htmlFor="year">Year</Label>
              <Input type="number" name="year" id="year" placeholder="2024" required />
              <Label htmlFor="type">Type</Label>
              <select.Select name="type" required>
                <select.SelectTrigger tabIndex={0} id="type">
                  <select.SelectValue placeholder="Choose Fall/Spring" />
                </select.SelectTrigger>
                <select.SelectContent>
                  <select.SelectItem value="Fall">Fall</select.SelectItem>
                  <select.SelectItem value="Spring">Spring</select.SelectItem>
                </select.SelectContent>
              </select.Select>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full mt-2' type="submit" disabled={pending}>
      {pending ? "Creating" : "Create"} New Season
    </Button>
  );
};