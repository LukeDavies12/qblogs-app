"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function SignUp(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error: signUpError } = await supabase.auth.signUp(data);

  if (signUpError) {
    redirect("/error");
  }

  const teamData = {
    team_name: formData.get("team_name") as string,
  };

  const { data: newTeam, error: teamError } = await supabase
    .from("teams")
    .insert({ name: teamData.team_name})
    .select();

  if (teamError) {
    redirect("/error");
  }

  const publicUserData = {
    auth_id: authData.user?.id,
    type: formData.get("title") as string,
    full_name: formData.get("full_name") as string,
    current_team_id: newTeam[0]?.id,
  };

  const { data: newPublicUser, error: publicUserError } = await supabase
    .from("users")
    .insert(publicUserData)
    .select();

  if (publicUserError) {
    redirect("/error");
  }

  const { data: newMemberData, error: memberError } = await supabase
    .from("members")
    .insert({ user_id: newPublicUser[0]?.id, team_id: newTeam[0]?.id })
    .select();

  if (memberError) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
