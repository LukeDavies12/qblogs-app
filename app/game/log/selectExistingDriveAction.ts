"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// I want to update the user current_game_drive_id with this server action that takes in user id and that drive id to update

export async function SelectExistingDriveAction(
  userId: string,
  gameId: string,
  formData: FormData
) {
  const supabase = createClient();

  const driveId = formData.get("drive_id") as string;

  const { error } = await supabase
    .from("users")
    .update({ current_game_drive_id: driveId })
    .eq("auth_id", userId);

  if (error) {
    console.error(error);
    throw new Error("Error selecting existing drive");
  }

  // Revalidate the paths
  revalidatePath("/");
  revalidatePath("/layout");
  redirect(`/game/log/${gameId}`);
}
