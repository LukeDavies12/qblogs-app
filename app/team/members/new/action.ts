"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function CreateNewMember(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error: signUpError } =
    await supabase.auth.admin.createUser(data);

  if (signUpError) {
    redirect("/error");
  }

  const publicUserData = {
    full_name: formData.get("full_name") as string,
    type: formData.get("title") as string,
  };

  const { data: currentPublicUserData } = await supabase
    .from("users")
    .select("current_team_id, current_season_id")
    .single();

  const { data: newPublicUser, error: publicUserError } = await supabase
    .from("users")
    .insert({
      auth_id: authData.user.id,
      type: publicUserData.type,
      full_name: publicUserData.full_name,
      current_team_id: currentPublicUserData?.current_season_id,
      current_season_id: currentPublicUserData?.current_season_id,
    })
    .select()
    .single();

  if (publicUserError) {
    redirect("/error");
  }

  const { data: newMemberData, error: newMemberError } = await supabase
    .from("members")
    .insert({
      user_id: newPublicUser.auth_id,
      team_id: newPublicUser.current_team_id,
    });

  if (newMemberError) {
    redirect("/error");
  }

  if ((formData.get("title") as string) == "QB") {
    const { data: teamQbData, error: teamQbError } = await supabase
      .from("team_qbs")
      .insert({
        full_name: newPublicUser.full_name,
        user_id: newPublicUser.auth_id,
        team_id: newPublicUser.current_team_id,
      });

    if (teamQbError) {
      redirect("/error");
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}
