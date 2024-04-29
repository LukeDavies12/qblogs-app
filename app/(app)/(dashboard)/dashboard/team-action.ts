"use server"

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
  "Professional"
] as const;

const CreateTeamSchema = z.object({
  city: z.string().min(2),
  state: z.string().min(2).max(2),
  level: z.enum(level_options),
  team_name: z.string().min(3),
  logo: z.string().url()
});

const createTeamErrorMsg = (errors: any): string => {
  if (errors.city) return "Invalid City";
  if (errors.state) return "Invalid State";
  if (errors.level) return "Invalid Level";
  if (errors.team_name) return "Invalid Team Name";
  if (errors.logo) return "Invalid Logo URL";
  return "";
};

const validateCreateTeamformData = (
  formData: FormData
):
  | { data: { city: string; state: string; level: typeof level_options[number]; team_name: string; logo: string }; error: null }
  | { data: null; error: string } => {
  const city = formData.get("city");
  const state = formData.get("state");
  const level = formData.get("level");
  const team_name = formData.get("team_name");
  const logo = formData.get("logo");
  const result = CreateTeamSchema.safeParse({ city, state, level, team_name, logo });

  if (!result.success) {
    return {
      data: null,
      error: createTeamErrorMsg(result.error.flatten().fieldErrors),
    };
  }
  return { data: result.data, error: null };
};

export async function CreateTeamAction(state: { error: string; } | undefined, formData: FormData) {
  const supabase = createClient();
  const { data, error } = validateCreateTeamformData(formData);
  if (error !== null) return { error };

  if (data) {
    const { error: insertError } = await supabase.from("teams").insert([data]);
    if (insertError) {
      console.log(insertError);
      redirect("/error");
    }
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }
}