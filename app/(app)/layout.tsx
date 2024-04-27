import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <>
      <main className="container mx-auto px-4">
        {children}
      </main>
    </>
  );
}