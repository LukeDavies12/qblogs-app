"use server";

import { Database } from "@/generated/supabase";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updatePlayById(id: string, formData: FormData) {
  const supabase = createClient();
  type InsertParameters = Database["public"]["Tables"]["plays"]["Insert"];

  const data = {
    num_in_drive: parseInt(formData.get("num_in_drive") as string),
    down: parseInt(formData.get("down") as string),
    distance: parseInt(formData.get("distance") as string),
    hash: formData.get("hash") as InsertParameters["hash"],
    yard_line: parseInt(formData.get("yard_line") as string),
    qb_id: formData.get("qb_id") as InsertParameters["qb_id"],
    personnel: formData.get("personnel") as InsertParameters["personnel"],
    formation: formData.get("formation") as InsertParameters["formation"],
    back_tag: formData.get("back_tag") as InsertParameters["back_tag"],
    strength: formData.get("strength") as InsertParameters["strength"],
    motion: formData.get("motion") as InsertParameters["motion"],
    pass_pro: formData.get("pass_pro") as InsertParameters["pass_pro"],
    call: formData.get("call") as InsertParameters["call"],
    call_tag: formData.get("call_tag") as InsertParameters["call_tag"],
    call_family: formData.get("call_family") as InsertParameters['call_family'],
    type: formData.get("result") as InsertParameters['type'],
    yards: formData.get("yards") as InsertParameters["yards"],
    qb_pressured: formData.get("qb_pressured") as InsertParameters["qb_pressured"],
    qb_read_yn: formData.get("qb_read_yn") as InsertParameters["qb_read_yn"],
    qb_play_yn: formData.get("qb_play_yn") as InsertParameters["qb_play_yn"],
    turnover_worthy_play: formData.get("turnover_worthy_play") as InsertParameters["turnover_worthy_play"],
    defense_front: formData.get("defense_front") as InsertParameters["defense_front"],
    defense_coverage: formData.get("defense_coverage") as InsertParameters["defense_coverage"],
    notes: formData.get("notes") as InsertParameters["notes"],
    bad_play_reason: formData.get("bad_play_reason") as InsertParameters["bad_play_reason"],
  };

  const { error } = await supabase
    .from("plays")
    .update(data)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/layout");
  revalidatePath(`/play/${id}/update`);

  redirect(`/play/${id}/update`);
}
