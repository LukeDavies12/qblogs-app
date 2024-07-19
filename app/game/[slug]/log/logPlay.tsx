"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { LogPlayAction } from "./playAction";

interface CreateGameDriveProps {
  gameId: string;
  gameDriveId: string;
  teamQbs: any[];
}

export const LogPlay: React.FC<CreateGameDriveProps> = ({ gameId, gameDriveId, teamQbs }) => {
  const LogPlayOnDrive = LogPlayAction.bind(null, gameId, gameDriveId);
  const ref = useRef<HTMLFormElement>(null);

  const [qbId, setQbId] = useState("");
  const [result, setResult] = useState("");
  const [qbRead, setQbRead] = useState("");
  const [qbExecution, setQbExecution] = useState("");
  const [qbExceptionalPlay, setQbExceptionalPlay] = useState("");
  const [turnoverWorthyPlay, setTurnoverWorthyPlay] = useState("");

  async function onLog(formData: FormData) {
    const res = await LogPlayAction(gameId, gameDriveId, formData);
    ref.current?.reset();
    resetSelectComponents();
  }

  function resetSelectComponents() {
    setQbId("");
    setResult("");
    setQbRead("");
    setQbExecution("");
    setQbExceptionalPlay("");
    setTurnoverWorthyPlay("");
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Log Play</h2>
      <form className="space-y-6" action={onLog} ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="qb_id">QB In*</Label>
            <Select name="qb_id" required value={qbId} onValueChange={setQbId}>
              <SelectTrigger tabIndex={0} id="qb_id">
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
          <div className="flex flex-col gap-1">
            <Label htmlFor="down">Down*</Label>
            <Input type="number" name="down" id="down" placeholder="1" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="distance">Distance*</Label>
            <Input type="number" name="distance" id="distance" placeholder="10" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="yard_line">Yard Line*</Label>
            <Input type="number" name="yard_line" id="yard_line" placeholder="67" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="personnel">Personnel*</Label>
            <Input type="text" name="personnel" id="personnel" placeholder="11" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="result">Result*</Label>
            <Select name="result" required value={result} onValueChange={setResult}>
              <SelectTrigger tabIndex={0} id="result">
                <SelectValue placeholder="Select Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Complete">Complete</SelectItem>
                <SelectItem value="Incomplete">Incomplete</SelectItem>
                <SelectItem value="Incomplete Drop">Incomplete Drop</SelectItem>
                <SelectItem value="Rush">Rush</SelectItem>
                <SelectItem value="QB Rush">QB Rush</SelectItem>
                <SelectItem value="Sack">Sack</SelectItem>
                <SelectItem value="Penalty">Penalty</SelectItem>
                <SelectItem value="Interception">Interception</SelectItem>
                <SelectItem value="Fumble">Fumble</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="call">Play Call*</Label>
            <Input type="text" name="call" id="call" placeholder="Even Elk" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="call_family">Play Family*</Label>
            <Input type="text" name="call_family" id="call_family" placeholder="OZ RPO" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="qb_read" className="font-bold">QB Read*</Label>
            <Select name="qb_read" required value={qbRead} onValueChange={setQbRead}>
              <SelectTrigger tabIndex={0} id="qb_read">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Bad">Bad</SelectItem>
                <SelectItem value="NA">NA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="qb_execution">QB Execution*</Label>
            <Select name="qb_execution" required value={qbExecution} onValueChange={setQbExecution}>
              <SelectTrigger tabIndex={0} id="qb_execution">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Bad">Bad</SelectItem>
                <SelectItem value="NA">NA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="qb_exceptional_play">QB Exceptional Play*</Label>
            <Select name="qb_exceptional_play" required value={qbExceptionalPlay} onValueChange={setQbExceptionalPlay}>
              <SelectTrigger tabIndex={0} id="qb_exceptional_play">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="turnover_worthy_play">Turnover Worthy Play*</Label>
            <Select name="turnover_worthy_play" required value={turnoverWorthyPlay} onValueChange={setTurnoverWorthyPlay}>
              <SelectTrigger tabIndex={0} id="turnover_worthy_play">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea name="notes" id="notes" placeholder="Enter Notes"></Textarea>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="bad_play_reason">Bad Play Reason</Label>
            <Textarea name="bad_play_reason" id="bad_play_reason" placeholder="If it was a bad play explain why"></Textarea>
          </div>
        </div>
        <SubmitButton />
      </form>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full' type="submit" disabled={pending}>
      {pending ? "Logging" : "Log"} Play
    </Button>
  );
};