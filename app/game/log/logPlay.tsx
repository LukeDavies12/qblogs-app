"use client"

import "@/app/(auth)/auth.css"
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
        <div className="md:flex md:gap-2 md:w-3/4">
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="num_in_drive">Play # in Drive*</label>
            <input type="number" name="num_in_drive" id="num_in_drive" placeholder="1" className="w-full" required />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="down">Down*</label>
            <input type="number" name="down" id="down" placeholder="1" className="w-full" required />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="distance">Distance*</label>
            <input type="number" name="distance" id="distance" placeholder="10" className="w-full" required />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="hash">Hash*</label>
            <select name="hash" id="hash" className="w-full" required defaultValue={"hash"}>
              <option value={"hash"}disabled hidden>Select a Hash</option>
              <option value="L">L</option>
              <option value="LM">LM</option>
              <option value="M">M</option>
              <option value="RM">RM</option>
              <option value="R">R</option>
            </select>
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="yard_line">Yard Line*</label>
            <input type="number" name="yard_line" id="yard_line" placeholder="67" className="w-full" required />
          </div>
        </div>
        <div className="md:flex md:gap-2 md:w-3/4">
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="qb_id">Qb In*</label>
            <select name="qb_id" id="qb_id" className="w-full" required>
              <option disabled selected hidden>Choose QB</option>
              {teamQbs.map((qb) => (
                <option key={qb.id} value={qb.id}>{qb.full_name}</option>
              ))}
            </select>
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="personnel">Personnel*</label>
            <input type="text" name="personnel" id="personnel" placeholder="20" className="w-full" required />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="formation">Formation*</label>
            <input type="text" name="formation" id="formation" placeholder="Strong" className="w-full" required />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="back_tag">Back Tag</label>
            <input type="text" name="back_tag" id="back_tag" placeholder="B" className="w-full" />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="strength">Strength*</label>
            <input type="text" name="strength" id="strength" placeholder="R" className="w-full" required />
          </div>
        </div>
        <div className="md:flex md:gap-2 md:w-3/4">
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="motion">Motion</label>
            <input type="text" name="motion" id="motion" placeholder="Fap" className="w-full" />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="pass_pro">Pass Pro</label>
            <input type="text" name="pass_pro" id="pass_pro" placeholder="57" className="w-full" />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="call">Play Call*</label>
            <input type="text" name="call" id="call" placeholder="Even Elk" className="w-full" required />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="tags">Tags</label>
            <input type="text" name="tags" id="tags" placeholder="Key Houston" className="w-full" />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="call_family">Play Family*</label>
            <input type="text" name="call_family" id="call_family" placeholder="OZ RPO" className="w-full" required />
          </div>
        </div>
        <div className="md:flex md:gap-2 md:w-3/4">
          <div className="md:w-1/4 flex flex-col gap-1">
            <label htmlFor="result">Result*</label>
            <select name="result" id="result" className="w-full" required>
              <option value="Complete">Complete</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Rush">Rush</option>
              <option value="QB Rush">QB Rush</option>
              <option value="Sack">Sack</option>
              <option value="Penalty">Penalty</option>
              <option value="Interception">Interception</option>
              <option value="Fumble">Fumble</option>
            </select>
          </div>
          <div className="md:w-1/4 flex flex-col gap-1">
            <label htmlFor="yards">Yards*</label>
            <input type="number" name="yards" id="yards" placeholder="4" className="w-full" required />
          </div>
          <div className="md:w-1/4 flex flex-col gap-1">
            <label htmlFor="notes">Notes</label>
            <textarea className="w-full" name="notes" id="notes" placeholder="Enter Notes"></textarea>
          </div>
          <div className="md:w-1/4 flex flex-col gap-1">
            <label htmlFor="bad_play_reason">Bad Play Reason</label>
            <textarea className="w-full" name="bad_play_reason" id="bad_play_reason" placeholder="Rolled into run we didn't throw RPO"></textarea>
          </div>
        </div>
        <div className="md:flex md:gap-2 md:w-3/4">
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="qb_pressured">QB Pressured</label>
            <select name="qb_pressured" id="qb_pressured" className="w-full" required>
            <option value="NA">NA</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="qb_read_yn" className="font-bold">QB Read Correct</label>
            <select name="qb_read_yn" id="qb_read_yn" className="w-full" required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="NA">NA</option>
            </select>
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="qb_play_yn" className="font-bold">QB Maxed Execution</label>
            <select name="qb_play_yn" id="qb_play_yn" className="w-full" required>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="NA">NA</option>
            </select>
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="qb_ball_placement_good">QB Ball Placement Good</label>
            <select name="qb_ball_placement_good" id="qb_ball_placement_good" className="w-full">
              <option value="NA">NA</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="turnover_worthy_play">Turnover Worthy Play</label>
            <select name="turnover_worthy_play" id="turnover_worthy_play" className="w-full" required>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>
        <div className="md:flex md:gap-2 md:w-3/4">
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="defense_front">Defense Front</label>
            <input type="text" name="defense_front" id="defense_front" placeholder="Enter defense front" className="w-full" required />
          </div>
          <div className="md:w-1/5 flex flex-col gap-1">
            <label htmlFor="defense_coverage">Defense Coverage</label>
            <input type="text" name="defense_coverage" id="defense_coverage" placeholder="Enter defense coverage" className="w-full" required />
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
    <button className="w-full md:w-3/4 font-medium bg-emerald-700 text-white rounded-sm px-8 py-2" type="submit" disabled={pending}>
      {pending ? "Logging" : "Log"} Play
    </button>
  );
};