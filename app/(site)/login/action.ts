"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";
import { ActionResult } from "next/dist/server/app-render/types";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const getLoginErrorMessage = (errors: any): string => {
  if (errors.email) return "Invalid Email";
  if (errors.password) return "Invalid Password - " + errors.password[0];
  return "";
};

const validateSignInformData = (
  formData: FormData
):
  | { data: { email: string; password: string }; error: null }
  | { data: null; error: string } => {
  const email = formData.get("email");
  const password = formData.get("password");
  const result = LoginSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      data: null,
      error: getLoginErrorMessage(result.error.flatten().fieldErrors),
    };
  }
  return { data: result.data, error: null };
};

export async function login(
  _: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const supabase = createClient();
  const { data, error } = validateSignInformData(formData);
  if (error !== null) return { error };

  try {
    if (data) {
      const { error: signInError } = await supabase.auth.signInWithPassword(
        data
      );
      if (signInError) {
        console.log(signInError);
        redirect("/error");
      }
      revalidatePath("/", "layout");
      redirect("/dashboard");
    }
  } catch (error) {
    console.error(error);
    redirect("/error");
  }
}
