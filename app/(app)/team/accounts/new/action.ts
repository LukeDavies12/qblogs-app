"use server";

import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const authCreateUser = async (data: { email: string; password: string }) => {
  const supabase = createAdminClient();

  // Access auth admin api
  const result = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: false,
  });
  return result;
};

export async function CreateNewMember(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: authData, error: signUpError } = await authCreateUser(data);

  if (signUpError) {
    console.log(signUpError.message);
    redirect("/error");
  }

  const publicUserData = {
    full_name: formData.get("full_name") as string,
    type: formData.get("title") as string,
  };

  const { data: authUser } = await supabase.auth.getUser();
  const { data: currentPublicUserData, error: currentPublicUserDataError } =
    await supabase
      .from("users")
      .select("current_team_id, current_season_id")
      .eq("auth_id", authUser.user?.id as string)
      .single();

  if (currentPublicUserDataError) {
    console.log(currentPublicUserDataError.message);
    redirect("/error");
  }

  if (
    !currentPublicUserData?.current_team_id ||
    !currentPublicUserData?.current_season_id
  ) {
    console.log("Current team ID or season ID is missing");
    redirect("/error");
  }

  type TeamRole =
    | "QB"
    | "Head Coach"
    | "Offensive Coordinator"
    | "Pass Game Coordinator"
    | "Run Game Coordinator"
    | "QB Coach"
    | "RB Coach"
    | "WR Coach"
    | "OL Coach";

  const { data: newPublicUser, error: publicUserError } = await supabase
    .from("users")
    .insert({
      auth_id: authData.user.id as string,
      type: publicUserData.type as TeamRole,
      full_name: publicUserData.full_name as string,
      current_team_id: currentPublicUserData.current_team_id as string,
      current_season_id: currentPublicUserData.current_season_id as string,
    })
    .select()
    .single();

  if (publicUserError) {
    console.log(publicUserError.message);
    redirect("/error");
  }

  if ((formData.get("title") as string) === "QB") {
    const { data: teamQbData, error: teamQbError } = await supabase
      .from("team_qbs")
      .insert({
        full_name: newPublicUser.full_name,
        user_id: newPublicUser.auth_id,
        team_id: newPublicUser.current_team_id,
      });

    if (teamQbError) {
      console.log(teamQbError.message);
      redirect("/error");
    }
  }

  revalidatePath("/", "layout");
  redirect("/team/");
}
