import Navbar from "@/components/sections/navbar";
import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    return redirect('/dashboard')
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">
        {children}
      </main>
    </>
  );
}