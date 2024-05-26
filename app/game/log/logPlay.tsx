"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { LogPlayAction } from "./playAction";
import { useRef } from "react";

interface CreateGameDriveProps {
  gameId: string;
  gameDriveId: string;
  teamQbs: any[];
}

export const LogPlay: React.FC<CreateGameDriveProps> = ({ gameId, gameDriveId, teamQbs }) => {
  const LogPlayOnDrive = LogPlayAction.bind(null, gameId, gameDriveId);
  const ref = useRef<HTMLFormElement>(null);

  async function onLog(formData: FormData) {
    const res = await LogPlayAction(gameId, gameDriveId, formData);
    ref.current?.reset();
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-neutral-500">
        Start is yards away from the end zone, for example the -33 is 67 yards away.
      </p>
      <form className="flex flex-col gap-1" action={onLog} ref={ref}>
        <div className="md:flex md:gap-2 md:w-full">
          <div className="md:w-1/6 flex flex-col gap-1">
            <Label htmlFor="num_in_drive">Play # in Drive*</Label>
            <Input type="number" name="num_in_drive" id="num_in_drive" placeholder="1" required />
          </div>
          <div className="md:w-1/6 flex flex-col gap-1">
            <Label htmlFor="down">Down*</Label>
            <Input type="number" name="down" id="down" placeholder="1" required />
          </div>
          <div className="md:w-1/6 flex flex-col gap-1">
            <Label htmlFor="distance">Distance*</Label>
            <Input type="number" name="distance" id="distance" placeholder="10" required />
          </div>
          <div className="md:w-1/6 flex flex-col gap-1">
            <Label htmlFor="hash">Hash*</Label>
            <Select name="hash" required>
              <SelectTrigger tabIndex={0} id="hash">
                <SelectValue placeholder="Select a Hash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="LM">LM</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="RM">RM</SelectItem>
                <SelectItem value="R">R</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:w-1/6 flex flex-col gap-1">
            <Label htmlFor="yard_line">Yard Line*</Label>
            <Input type="number" name="yard_line" id="yard_line" placeholder="67" required />
          </div>
          <div className="md:w-1/6 flex flex-col gap-1">
            <Label htmlFor="qb_id">Qb In*</Label>
            <Select name="qb_id" required>
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
        </div>

        <div className="md:flex md:gap-2 md:w-full mt-3">
          <div className="md:w-1/9 flex flex-col gap-1">
            <Label htmlFor="personnel">Personnel*</Label>
            <Input type="text" name="personnel" id="personnel" placeholder="20" required />
          </div>
          <div className="md:w-1/9 flex flex-col gap-1">
            <Label htmlFor="formation">Formation*</Label>
            <Input type="text" name="formation" id="formation" placeholder="Strong" required />
          </div>
          <div className="md:w-1/9 flex flex-col gap-1">
            <Label htmlFor="back_tag">Back Tag</Label>
            <Input type="text" name="back_tag" id="back_tag" placeholder="B" />
          </div>
          <div className="md:w-1/9 flex flex-col gap-1">
            <Label htmlFor="strength">Strength*</Label>
            <Input type="text" name="strength" id="strength" placeholder="R" required />
          </div>
          <div className="md:w-1/9 flex flex-col gap-1">
            <Label htmlFor="motion">Motion</Label>
            <Input type="text" name="motion" id="motion" placeholder="Fap" />
          </div>
          <div className="md:w-1/9 flex flex-col gap-1">
            <Label htmlFor="pass_pro">Pass Pro</Label>
            <Input type="text" name="pass_pro" id="pass_pro" placeholder="57" />
          </div>
          <div className="md:w-1/9 flex flex-col gap-1">
            <Label htmlFor="call">Play Call*</Label>
            <Input type="text" name="call" id="call" placeholder="Even Elk" required />
          </div>
          <div className="md:w-1/9 flex flex-col gap-1">
            <Label htmlFor="tags">Tags</Label>
            <Input type="text" name="tags" id="tags"placeholder="Call Tag if one" />
          </div>
          <div className="md:w-1/9 flex flex-col gap-1">
            <Label htmlFor="call_family">Play Family*</Label>
            <Input type="text" name="call_family" id="call_family" placeholder="OZ RPO" required />
          </div>
        </div>

        <div className="md:grid md:grid-cols-9 md:gap-2 md:mt-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="result">Result*</Label>
            <Select name="result" required>
              <SelectTrigger tabIndex={0} id="result">
                <SelectValue placeholder="Select Result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Complete">Complete</SelectItem>
                <SelectItem value="Incomplete">Incomplete</SelectItem>
                <SelectItem value="Rush">Rush</SelectItem>
                <SelectItem value="QB Rush">QB Rush</SelectItem>
                <SelectItem value="Sack">Sack</SelectItem>
                <SelectItem value="Penalty">Penalty</SelectItem>
                <SelectItem value="Interception">Interception</SelectItem>
                <SelectItem value="Fumble">Fumble</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="yards">Yards*</Label>
            <Input type="text" name="yards" id="yards" placeholder="7" />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="qb_pressured">QB Pressured</Label>
            <Select name="qb_pressured" required>
              <SelectTrigger tabIndex={0} id="qb_pressured">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NA">NA</SelectItem>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="qb_read_yn" className="font-bold">QB Read Correct</Label>
            <Select name="qb_read_yn" required>
              <SelectTrigger tabIndex={0} id="qb_read_yn">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="NA">NA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="qb_play_yn" className="font-bold">QB Maxed Execution</Label>
            <Select name="qb_play_yn" required>
              <SelectTrigger tabIndex={0} id="qb_play_yn">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="NA">NA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="qb_ball_placement_good">QB Accurate</Label>
            <Select name="qb_ball_placement_good">
              <SelectTrigger tabIndex={0} id="qb_ball_placement_good">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NA">NA</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="turnover_worthy_play">Turnover Worthy Play</Label>
            <Select name="turnover_worthy_play" required>
              <SelectTrigger tabIndex={0} id="turnover_worthy_play">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="defense_front">Defense Front</Label>
            <Input type="text" name="defense_front" id="defense_front" placeholder="Enter defense front" required />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="defense_coverage">Defense Coverage</Label>
            <Input type="text" name="defense_coverage" id="defense_coverage" placeholder="Enter defense coverage" required />
          </div>
        </div>

        <div className="md:flex md:gap-2 md:w-full md:mt-3">
          <div className="md:w-1/2 flex flex-col gap-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea name="notes" id="notes" placeholder="Enter Notes"></Textarea>
          </div>
          <div className="md:w-1/2 flex flex-col gap-1">
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
    <Button className='md:w-full mt-3' type="submit" disabled={pending}>
      {pending ? "Logging" : "Log"} Play
    </Button>
  );
};
