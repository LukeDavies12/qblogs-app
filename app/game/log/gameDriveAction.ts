"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateGameDriveAction(gameId: any, formData: FormData) {
  const supabase = createClient();

  const data = {
    drive_in_game: parseInt(formData.get("drive_in_game") as string),
    start: parseInt(formData.get("start") as string),
    end: parseInt(formData.get("end") as string),
    notes: formData.get("notes") as string, 
    result: formData.get("result") as string,
    qb_id: formData.get("qb_id") as string,
    game_id: gameId,
  };

  const { data: gameDrive, error: gameDriveError } = await supabase.from("game_drives").insert(data).select().single();

  if(gameDriveError) {
    console.log(gameDriveError);
    redirect("/error");
  }

  const { error: updateUserError } = await supabase.from("users").update({ current_game_drive_id: gameDrive.id }).eq("auth_id", (await supabase.auth.getUser()).data.user?.id).single();

  if(updateUserError) {
    console.log(updateUserError);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(`/game/log/${gameId}`);
}
