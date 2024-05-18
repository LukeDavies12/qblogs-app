import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Link from "next/link"
import CreateSeason from "./seasons/createSeason"

export default async function Page() {
  const supabase = createClient()

  const { data: authUser, error } = await supabase.auth.getUser()
  if (authUser?.user) {
    const { data: publicUserCurrentSeason, error } = await supabase.from("users").select('current_season_id').eq("auth_id", authUser.user.id).single()

    if (publicUserCurrentSeason?.current_season_id) {
      return (
        <div>
          has season
        </div>
      )
    } else {
      return (
        <CreateSeason />
      )
    }
  } else {
    return (
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="flex gap-2 items-center select-none cursor-default">
          <Image src="/qblogs_logo_lightmode.svg" alt="logo" width={32} height={32} />
          <span className="font-medium">QB Logs</span>
        </div>
        <div className="flex gap-4">
          <Link href={"/sign-up"}><button className="px-8 py-2 font-medium bg-emerald-700 text-white rounded-sm">Sign Up</button></Link>
          <Link href={"/login"}><button className="px-8 py-2 font-medium bg-neutral-100 text-emereald-700 rounded-sm">Login</button></Link>
        </div>
        <div>
          space for demo youtube video for alpha
        </div>
      </div>
    )
  }
}