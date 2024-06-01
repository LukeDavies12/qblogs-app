"use client"

import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useRef, useState } from 'react';
import { useFormStatus } from "react-dom";
import { CreateGameDriveAction } from "./gameDriveAction";

interface CreateGameDriveProps {
  gameId: string;
  teamQbs: any[];
}

export const CreateGameDriveToggleOne: React.FC<CreateGameDriveProps> = ({ gameId, teamQbs }) => {
  const [showForm, setShowForm] = useState(false);
  const toggleFormVisibility = () => setShowForm(!showForm);
  const CreateGameDriveForGameId = CreateGameDriveAction.bind(null, gameId);
  const ref = useRef<HTMLFormElement>(null);

  async function onCreate(formData: FormData) {
    const res = await CreateGameDriveAction(gameId, formData);
    ref.current?.reset();
    setShowForm(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="mb-1"
        onClick={toggleFormVisibility}
        variant={"outline"}
      >
        {showForm ? 'Hide' : 'Create New Game Drive'}
      </Button>
      {showForm && (
        <>
          <h3 className="font-bold">Create Game Drive</h3>
          <p className="-mt-3 text-muted-foreground">
            Start is yards away from the end zone, for example the -22 is 78 yards away.
          </p>
          <form className="flex flex-col gap-1 -mt-3" action={onCreate} ref={ref}>
            <div className='flex gap-2'>
              <div className='md:w-1/3'>
                <Label htmlFor="drive_in_game">Drive in Game</Label>
                <Input type="number" name="drive_in_game" id="drive_in_game" placeholder="3" required />
              </div>
              <div className='md:w-1/3'>
                <Label htmlFor="start">Start</Label>
                <Input type="number" name="start" id="start" placeholder="78" required />
              </div>
              <div className='md:w-1/3'>
                <Label htmlFor="end">End</Label>
                <Input type="number" name="end" id="end" placeholder="0" required />
              </div>
            </div>
            <div className='flex gap-2'>
              <div className='md:w-1/2'>
                <Label htmlFor="result">Result</Label>
                <Select name="result" required>
                  <SelectTrigger tabIndex={0} id="result">
                    <SelectValue placeholder="Select Result" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TD Pass">TD Pass</SelectItem>
                    <SelectItem value="TD Run">TD Run</SelectItem>
                    <SelectItem value="TD Run QB">TD Run QB</SelectItem>
                    <SelectItem value="Field Goal Made">Field Goal Made</SelectItem>
                    <SelectItem value="Field Goal Missed">Field Goal Missed</SelectItem>
                    <SelectItem value="Punt">Punt</SelectItem>
                    <SelectItem value="Turnover on Downs">Turnover on Downs</SelectItem>
                    <SelectItem value="Interception">Interception</SelectItem>
                    <SelectItem value="Fumble">Fumble</SelectItem>
                    <SelectItem value="End of Half">End of Half</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='md:w-1/2'>
                <Label htmlFor="qb_id">Qb In</Label>
                <Select name="qb_id" required>
                  <SelectTrigger id="qb_id">
                    <SelectValue placeholder="Choose QB" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamQbs.map((qb) => (
                      <SelectItem key={qb.id} value={qb.id}>
                        {qb.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea name="notes" id="notes" placeholder="Enter Notes" />
            <SubmitButton />
          </form>
        </>
      )}
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full mt-2' type="submit" disabled={pending}>
      {pending ? "Creating" : "Create"} Game Drive
    </Button>
  );
};
