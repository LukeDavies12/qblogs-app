"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function LogPlayAction(
  gameId: string,
  gameDriveId: string,
  formData: FormData
) {
  const supabase = createClient();

  function isYesNoNaType(value: string): value is "Yes" | "No" | "NA" {
    return ["Yes", "No", "NA"].includes(value);
  }

  function isHashType(value: string): value is "L" | "LM" | "M" | "RM" | "R" {
    return ["L", "LM", "M", "RM", "R"].includes(value);
  }

  function isPlayType(
    type: string
  ): type is
    | "Interception"
    | "Fumble"
    | "Complete"
    | "Incomplete"
    | "Incomplete Drop"
    | "Rush"
    | "QB Rush"
    | "Sack"
    | "Penalty" {
    return [
      "Interception",
      "Fumble",
      "Complete",
      "Incomplete",
      "Incomplete Drop",
      "Rush",
      "QB Rush",
      "Sack",
      "Penalty",
    ].includes(type);
  }

  const result = formData.get("result") as string;

  if (!isPlayType(result)) {
    throw new Error("Invalid play type");
  }

  const hash = formData.get("hash") as string;
  const qbBallPlacementGood = formData.get("qb_ball_placement_good") as string;
  const turnoverWorthyPlay = formData.get("turnover_worthy_play") as string;
  const qbPlayYn = formData.get("qb_play_yn") as string;
  const qbReadYn = formData.get("qb_read_yn") as string;
  const qbPressured = formData.get("qb_pressured") as string;

  if (
    !isHashType(hash) ||
    !isYesNoNaType(qbBallPlacementGood) ||
    !isYesNoNaType(turnoverWorthyPlay) ||
    !isYesNoNaType(qbPlayYn) ||
    !isYesNoNaType(qbReadYn) ||
    !isYesNoNaType(qbPressured)
  ) {
    throw new Error("Invalid type for hash or Yes/No/NA fields");
  }

  const data = {
    num_in_drive: parseInt(formData.get("num_in_drive") as string),
    down: parseInt(formData.get("down") as string),
    distance: parseInt(formData.get("distance") as string),
    hash: hash,
    yard_line: parseInt(formData.get("yard_line") as string),
    qb_id: formData.get("qb_id") as string,
    personnel: formData.get("personnel") as string,
    formation: formData.get("formation") as string,
    back_tag: formData.get("back_tag") as string,
    strength: formData.get("strength") as string,
    motion: formData.get("motion") as string,
    pass_pro: formData.get("pass_pro") as string,
    call: formData.get("call") as string,
    call_tag: formData.get("tags") as string,
    call_family: formData.get("call_family") as string,
    type: result,
    yards: formData.get("yards") as string,
    notes: formData.get("notes") as string,
    bad_play_reason: formData.get("bad_play_reason") as string,
    qb_pressured: qbPressured,
    qb_read_yn: qbReadYn,
    qb_play_yn: qbPlayYn,
    qb_ball_placement_good: qbBallPlacementGood,
    turnover_worthy_play: turnoverWorthyPlay,
    defense_front: formData.get("defense_front") as string,
    defense_coverage: formData.get("defense_coverage") as string,
    game_drive_id: gameDriveId,
  };

  const { data: play, error: playError } = await supabase
    .from("plays")
    .insert(data)
    .select()
    .single();

  if (playError) {
    console.log(playError);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(`/game/log/${gameId}`);
}
