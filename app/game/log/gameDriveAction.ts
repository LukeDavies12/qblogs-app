"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateGameDriveAction(formData: FormData, gameId: string) {
  const supabase = createClient();

  const data = {
    drive_in_game: parseInt(formData.get("drive_in_game") as string),
    start: parseInt(formData.get("start") as string),
    end: parseInt(formData.get("end") as string),
    notes: formData.get("notes") as string, 
    result: formData.get("result") as string,
  };

  const { error } = await supabase.from("game_drives").insert(data).select();

  if(error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect(`/game/log/${gameId}`);
}
