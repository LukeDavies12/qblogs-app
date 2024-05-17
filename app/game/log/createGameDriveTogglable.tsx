"use client"

import React, { useState } from 'react';
import "@/app/(auth)/auth.css";
import { useFormStatus } from "react-dom";
import { CreateGameDriveAction } from "./gameDriveAction";
import { useRef } from "react";

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
      <button
        className="mb-4 bg-neutral-100 text-neutral-700 px-4 py-2 rounded-sm md:w-3/4"
        onClick={toggleFormVisibility}
      >
        {showForm ? 'Hide' : 'Toggle New Game Drive'}
      </button>
      {showForm && (
        <>
          <h3 className="font-bold">Create Game Drive</h3>
          <p className="-mt-3">
            Start is yards away from the end zone, for example the -22 is 78 yards away.
          </p>
          <form className="flex flex-col gap-1 -mt-3" action={onCreate} ref={ref}>
            <label htmlFor="drive_in_game">Drive in Game</label>
            <input type="number" name="drive_in_game" id="drive_in_game" placeholder="3" required />
            <label htmlFor="start">Start</label>
            <input type="number" name="start" id="start" placeholder="78" required />
            <label htmlFor="end">End</label>
            <input type="number" name="end" id="end" placeholder="0" required />
            <label htmlFor="notes">Notes</label>
            <textarea name="notes" id="notes" placeholder="Enter Notes"></textarea>
            <label htmlFor="result">Result</label>
            <select name="result" id="result" required>
              <option value="TD Pass">TD Pass</option>
              <option value="TD Run">TD Run</option>
              <option value="Field Goal Made">Field Goal Made</option>
              <option value="Field Goal Missed">Field Goal Missed</option>
              <option value="Punt">Punt</option>
              <option value="Turnover on Downs">Turnover on Downs</option>
              <option value="Interception">Interception</option>
              <option value="Fumble">Fumble</option>
              <option value="End of Half">End of Half</option>
            </select>
            <label htmlFor="qb_id">Qb In</label>
            <select name="qb_id" id="qb_id" required>
              {teamQbs.map((qb) => (
                <option key={qb.id} value={qb.id}>{qb.full_name}</option>
              ))}
            </select>
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
    <button className="w-full md:w-1/2 font-medium bg-emerald-700 text-white rounded-sm px-8 py-2" type="submit" disabled={pending}>
      {pending ? "Creating" : "Create"} Game Drive
    </button>
  );
};