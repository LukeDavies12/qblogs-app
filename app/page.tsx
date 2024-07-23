import { AuthCheck } from "@/components/AuthCheck";
import { QBStatsDashboard } from "@/components/QBStatsDashboard";
import { SeasonCheck } from "@/components/SeasonCheck";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: authUser } = await supabase.auth.getUser();

  return (
    <AuthCheck authUser={authUser}>
      <SeasonCheck supabase={supabase} userId={authUser.user?.id}>
        <QBStatsDashboard supabase={supabase} />
      </SeasonCheck>
    </AuthCheck>
  );
}