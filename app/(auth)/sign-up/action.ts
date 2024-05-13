"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function SignUp(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  const teamData = {
    team_name: formData.get('team_name') as string,
  }

  const { error: teamError } = await supabase.from('teams').insert(teamData)

  if (teamError) {
    redirect('/error')
  }

  

  revalidatePath('/', 'layout')
  redirect('/')
}
