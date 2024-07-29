import { createClient } from "@/utils/supabase/server";
import ResetPassword from "./updatePassword";


export default async function Page() {
  const supabase = createClient();


  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-xl">Settings</h1>
      <ResetPassword />
    </div>
  );
}