import { createClient } from '@/utils/supabase/server'
import { redirect } from "next/navigation";
import DashboardNavbar from '@/components/sections/dashboard-navbar';

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <>
      <DashboardNavbar />
      <main className="container mx-auto px-4">
        {children}
      </main>
    </>
  );
}