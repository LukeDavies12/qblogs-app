import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = createClient()

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard </p>
    </>
  );
}