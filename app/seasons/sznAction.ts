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
  const data = {
    type: type,
    year: yearRaw,
    team_id: current_team_id?.current_team_id,
  };

  const { error } = await supabase.from("seasons").insert(data).select();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
