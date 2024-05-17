// serverActions.js
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function LogPlayAction(gameId: string, gameDriveId: string, formData: FormData) {
  const supabase = createClient();

  const data = {
    num_in_drive: parseInt(formData.get("num_in_drive") as string),
    down: parseInt(formData.get("down") as string),
    distance: parseInt(formData.get("distance") as string),
    hash: formData.get("hash") as string,
    yard_line: parseInt(formData.get("yard_line") as string),
    qb_id: formData.get("qb_id") as string,
    personnel: formData.get("personnel") as string,
    formation: formData.get("formation") as string,
    back_tag: formData.get("back_tag") as string ,
    strength: formData.get("strength") as string,
    motion: formData.get("motion") as string ,
    pass_pro: formData.get("pass_pro") as string ,
    call: formData.get("call") as string,
    call_tag: formData.get("tags") as string ,
    call_family: formData.get("call_family") as string,
    type: formData.get("result") as string,
    yards: parseInt(formData.get("yards") as string),
    notes: formData.get("notes") as string,
    bad_play_reason: formData.get("bad_play_reason") as string,
    qb_pressured: formData.get("qb_pressured") as string,
    qb_read_yn: formData.get("qb_read_yn") as string,
    qb_play_yn: formData.get("qb_play_yn") as string,
    qb_ball_placement_good: formData.get("qb_ball_placement_good") as string,
    turnover_worthy_play: formData.get("turnover_worthy_play") as string,
    defense_front: formData.get("defense_front") as string,
    defense_coverage: formData.get("defense_coverage") as string,
    game_drive_id: gameDriveId,
  };

  const { data: play, error: playError } = await supabase.from("plays").insert(data).select().single();

  if (playError) {
    console.log(playError);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(`/game/log/${gameId}`);
}
