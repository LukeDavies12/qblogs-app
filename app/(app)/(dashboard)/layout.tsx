import DashboardNavbar from "@/app/(app)/(dashboard)/dashboard/dashboard-navbar";
import Footer from "@/components/sections/footer";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('full_name')
    .eq('auth_id', user?.id as string)
    .single()

  if (userError || !userData) {
    console.error("Error fetching user data: ", userError);
    return { children };
  }

  return (
    <>
      <DashboardNavbar full_name={userData.full_name} />
      <main className="container mx-auto px-4 mt-8">
        {children}
      </main>
      <Footer />
    </>
  );
}