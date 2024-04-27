import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  if (error) {
    console.log('error layout')
    throw error
  }

  return (
    <>
      <main className="container mx-auto px-4">
        {children}
      </main>
    </>
  );
}