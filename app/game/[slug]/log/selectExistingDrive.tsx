'use client'

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as select from "@/components/ui/select";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { SelectExistingDriveAction } from "./selectExistingDriveAction";

export default function SelectExistingDrive({ current_game_drive_id, existingGameDrives, currentUserId, currentGameId }: { current_game_drive_id: string, existingGameDrives: any[], currentUserId: string, currentGameId: string }) {
  const [showForm, setShowForm] = useState(false);
  const toggleFormVisibility = () => setShowForm(!showForm);
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);
  const ref = useRef<HTMLFormElement>(null);
  const SelectExistingDriveActionForGameId = SelectExistingDriveAction.bind(null, currentUserId, currentGameId);

  async function onSelectDrive(formData: FormData) {
    if (!selectedDrive) {
      return;
    }

    const res = await SelectExistingDriveActionForGameId(formData);
    ref.current?.reset();
  }

  const handleChange = (value: string) => {
    setSelectedDrive(value);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Button
          className="mb-1"
          onClick={toggleFormVisibility}
          variant={"outline"}
        >
          {showForm ? 'Hide' : 'Select Existing Game Drive'}
        </Button>
        {showForm && (
          <>
            <h3 className="font-bold">Update from Current Game Drives</h3>
            <form className="flex flex-col gap-1 -mt-3" action={onSelectDrive} ref={ref}>
              <div className='flex gap-2'>
                <div className="w-full">
                  <Label htmlFor="drive_id">Drive</Label>
                  <select.Select name="drive_id" required onValueChange={(value: any) => handleChange(value)} defaultValue={current_game_drive_id}>
                    <select.SelectTrigger tabIndex={0} id="drive_id" className="w-full">
                      <select.SelectValue placeholder="Choose Drive" />
                    </select.SelectTrigger>
                    <select.SelectContent>
                      {existingGameDrives.map((drive) => (
                        <select.SelectItem key={drive.id} value={drive.id}>
                          {drive.drive_in_game}
                        </select.SelectItem>
                      ))}
                    </select.SelectContent>
                  </select.Select>
                </div>
              </div>
              <SubmitButton />
            </form>
          </>
        )
        }
      </div>
    </>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full mt-2' type="submit" disabled={pending}>
      {pending ? "Updating" : "Update"} Game Drive
    </Button>
  );
};
