"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateSeasonAction(formData: FormData) {
  const supabase = createClient();

  const { data: current_team_id } = await supabase
    .from("users")
    .select("current_team_id")
    .single();

  const yearRaw = formData.get("year");

  function isSeasonType(str: string): str is "Fall" | "Spring" {
    return str === "Fall" || str === "Spring";
  }

  if (yearRaw) {
    const typeRaw = formData.get("type") as string;
    if (!isSeasonType(typeRaw)) {
      throw new Error(`Invalid season type: ${typeRaw}`);
    }
    const type = typeRaw;

    const data = {
      type: type,
      year: parseInt(yearRaw.toString()),
      team_id: current_team_id?.current_team_id,
    };

    const { data: insertSeason, error: insertSeasonError } = await supabase
      .from("seasons")
      .insert(data)
      .select();

    if (insertSeasonError) {
      redirect("/error");
    }

    const { error: updatePublicUserError } = await supabase
      .from("users")
      .update({ current_season_id: insertSeason[0]?.id })
      .eq("auth_id", (await supabase.auth.getUser()).data.user?.id as string)
      .select();

    if (updatePublicUserError) {
      redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
  } else {
    redirect("/error");
  }
}
