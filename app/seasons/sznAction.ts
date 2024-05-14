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

  const type = formData.get("type") as string;
  const yearRaw = formData.get("year");
  if (yearRaw) {
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
      .eq('auth_id', (await supabase.auth.getUser()).data.user?.id)
      .select()

    if(updatePublicUserError) {
      redirect("/error")
    }

    revalidatePath("/", "layout");
    redirect("/");
  } else {
    redirect("/error");
  }
}
