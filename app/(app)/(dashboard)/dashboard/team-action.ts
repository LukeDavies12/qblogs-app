"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

const level_options = [
  "High School",
  "D3",
  "NAIA",
  "D2",
  "D1 FCS",
  "D1 FBS",
  "Professional",
] as const;

const CreateTeamSchema = z.object({
  city: z.string().min(2),
  state: z.string().min(2).max(2),
  level: z.enum(level_options),
  logo_url: z.string().url(),
  team_name: z.string().min(3),
});

const createTeamErrorMsg = (errors: any): string => {
  if (errors.city) return "Invalid City, must be at least 2 characters long";
  if (errors.state)
    return "Invalid State, must be exactly 2 characters long, IL";
  if (errors.level)
    return "Invalid Level, must be one of the following: High School, D3, NAIA, D2, D1 FCS, D1 FBS, Professional";
  if (errors.logo) return "Invalid Logo URL";
  if (errors.name)
    return "Invalid Team Name, must be at least 3 characters long";
  return "";
};

const validateCreateTeamformData = (
  formData: FormData
):
  | {
      data: {
        city: string;
        state: string;
        level: string;
        team_name: string;
      };
      error: null;
    }
  | { data: null; error: string } => {
  const city = formData.get("city");
  const state = formData.get("state");
  const level = formData.get("level");
  const team_name = formData.get("name");
  const result = CreateTeamSchema.safeParse({
    city,
    state,
    level,
    team_name,
  });

  if (!result.success) {
    return {
      data: null,
      error: createTeamErrorMsg(result.error.flatten().fieldErrors),
    };
  }
  return { data: result.data, error: null };
};

export async function CreateTeamAction(
  state: { error: string } | undefined,
  formData: FormData
) {
  const { data, error } = validateCreateTeamformData(formData);
  if (error !== null) return { error };

  console.log([
    {
      city: data.city,
      state: data.state,
      level: data.level,
      name: data.team_name,
    },
  ]);

  const supabase = createClient();

  try {
    const { data: teamsData, error: teamsError } = await supabase
      .from("teams")
      .insert([
        {
          city: data.city,
          state: data.state,
          level: data.level,
          name: data.team_name,
        },
      ])
      .select("id");
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const { error: memberError } = await supabase.from("members").insert([
      {
        team_id: teamsData?.[0].id,
        user_id: userData.user?.id,
      },
    ]);
  } catch (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
