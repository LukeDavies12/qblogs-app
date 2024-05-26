"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function DeletePlayAction(playId: string, fromGameId: string, formData: FormData) {
  const supabase = createClient();

  const { error } = await supabase
    .from("plays")
    .delete()
    .eq("id", playId)

  if (error) {
    console.error(error);
    throw new Error("Error deleting play");
  }

  // Revalidate the paths
  revalidatePath("/");
  revalidatePath("/layout");

  // Redirect to the game plays page
  redirect(`/game/plays/${fromGameId}`);
}
