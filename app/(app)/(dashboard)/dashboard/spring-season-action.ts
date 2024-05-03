"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function CreateSpringSeasonAction() {
  const supabase = createClient();

  try {
    const { data: userData } = await supabase.from("users").select("current_team_id").single();
    const { error } = await supabase.from("spring_seasons").insert([
      {
        year: new Date().getFullYear(),
        team_id: userData?.current_team_id
      }
    ]);
  } catch (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
