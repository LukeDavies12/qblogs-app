// serverActions.js
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function LogPlayAction(gameDriveId: string, formData: FormData) {
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
    back_tag: formData.get("back_tag") as string || null,
    strength: formData.get("strength") as string,
    motion: formData.get("motion") as string || null,
    pass_pro: formData.get("pass_pro") as string || null,
    call: formData.get("call") as string,
    tags: formData.get("tags") as string || null,
    call_family: formData.get("call_family") as string,
    result: formData.get("result") as string,
    yards: parseInt(formData.get("yards") as string),
    notes: formData.get("notes") as string || null,
    bad_play_reason: formData.get("bad_play_reason") as string || null,
    qb_pressured: formData.get("qb_pressured") === "Yes",
    qb_read_yn: formData.get("qb_read_yn") as string,
    qb_play_yn: formData.get("qb_play_yn") as string,
    qb_ball_placement_good: formData.get("qb_ball_placement_good") as string,
    turnover_worthy_play: formData.get("turnover_worthy_play") === "Yes",
    defense_front: formData.get("defense_front") as string,
    defense_coverage: formData.get("defense_coverage") as string,
    redzone: formData.get("redzone") === "Yes",
    backed_up: formData.get("backed_up") === "Yes",
    two_minute: formData.get("two_minute") === "Yes",
    game_drive_id: gameDriveId,
  };

  const { data: play, error: playError } = await supabase.from("plays").insert(data).select().single();

  if (playError) {
    console.log(playError);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(`/game/log/${gameDriveId}`);
}
