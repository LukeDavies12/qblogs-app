"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function Login(formData: FormData) {
  const supabase = createClient();

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (signInError) {
    console.log(signInError);
    redirect("/error");
  }

  revalidatePath('/', 'layout')
  redirect('/')
}


export async function sendResetPasswordEmail(email: string) {  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    })

    if (error) {
      throw error
    }

    // Password reset email sent successfully
    return { success: true, message: "Password reset email sent. Please check your inbox." }
  } catch (error) {
    console.error("Error sending password reset email:", error)
    return { success: false, message: "Failed to send password reset email. Please try again." }
  }
}
