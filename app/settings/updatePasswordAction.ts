"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function ResetPasswordAction(formData: FormData) {
  const supabase = createClient();

  const { error: signInError } = await supabase.auth.updateUser({
    password: formData.get("password") as string,
  });

  if (signInError) {
    console.log(signInError);
    redirect("/error");
  }

  revalidatePath("/", "layout");
}
