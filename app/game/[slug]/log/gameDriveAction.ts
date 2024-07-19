"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateGameDriveAction(
  gameId: string,
  formData: FormData
) {
  const supabase = createClient();

  function isResult(
    value: string
  ): value is
    | "TD Pass"
    | "TD Run"
    | "Field Goal Made"
    | "Field Goal Missed"
    | "Punt"
    | "Turnover on Downs"
    | "Interception"
    | "Fumble"
    | "End of Half"
    | "Safety" {
    return [
      "TD Pass",
      "TD Run",
      "Field Goal Made",
      "Field Goal Missed",
      "Punt",
      "Turnover on Downs",
      "Interception",
      "Fumble",
      "End of Half",
      "Safety",
    ].includes(value);
  }

  const result = formData.get("result") as string;

  if (isResult(result)) {
    const data = {
      drive_in_game: parseInt(
        formData.get("drive_in_game")?.toString() as string
      ),
      start: parseInt(formData.get("start") as string),
      end: parseInt(formData.get("end") as string),
      notes: formData.get("notes") as string,
      result: result,
      qb_id: formData.get("qb_id") as string,
      game_id: gameId,
    };

    const { data: gameDrive, error: gameDriveError } = await supabase
      .from("game_drives")
      .insert(data)
      .select()
      .single();

    if (gameDriveError) {
      console.log(gameDriveError);
      redirect("/error");
    }

    const { error: updateUserError } = await supabase
      .from("users")
      .update({ current_game_drive_id: gameDrive.id })
      .eq("auth_id", (await supabase.auth.getUser()).data.user?.id as string)
      .single();

    if (updateUserError) {
      console.log(updateUserError);
      redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect(`/game/${gameId}/log`);
  } else {
    console.log("Invalid Result");
    redirect("/error");
  }
}
