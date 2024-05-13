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
    console.log("Error signing up:", signUpError);
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
    console.log("team error", teamError);
    redirect("/error");
  }

  const publicUserData = {
    user_id: authData.user?.id,
    team_id: newTeam[0]?.id,
    full_name: formData.get("full_name") as string,
    type: formData.get("title") as string,
  };

  const { data: newPublicUser, error: publicUserError } = await supabase
    .from("public_users")
    .insert(publicUserData)
    .select();

  if (publicUserError) {
    console.log("public user error", publicUserError);
    redirect("/error");
  }

  const { data: newMemberData, error: memberError } = await supabase
    .from("members")
    .insert({ user_id: newPublicUser[0]?.id, team_id: newTeam[0]?.id })
    .select();

  if (memberError) {
    console.log("member error", memberError);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
