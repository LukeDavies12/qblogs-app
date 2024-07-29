"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateSpringGameAction(formData: FormData) {
  const supabase = createClient();

  const data = {
    name: formData.get("name") as string,
    date: formData.get("date") as string,
  };

  const { data: publicUser } = await supabase
    .from("users")
    .select("current_season_id")
    .eq("auth_id", (await supabase.auth.getUser()).data.user?.id as string)
    .single();

  const { error } = await supabase.from("games").insert({
    name: data.name,
    date: data.date,
    season_id: publicUser?.current_season_id,
  });

  if (error) {
    console.log(error.message);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/season");
}
