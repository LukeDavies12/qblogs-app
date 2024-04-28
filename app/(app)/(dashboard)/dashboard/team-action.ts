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
  team_name: z.string().min(3)
});