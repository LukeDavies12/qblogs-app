import { createClient } from "@/utils/supabase/server"
import Image from "next/image"
import Link from "next/link"
import CreateSeason from "./seasons/createSeason"
import { Button } from "@/components/ui/button"
import LogoSpan from "@/components/LogoSpan"

export default async function Page() {
  const supabase = createClient()

  const { data: authUser, error } = await supabase.auth.getUser()
  if (authUser?.user) {
    const { data: publicUserCurrentSeason, error } = await supabase.from("users").select('current_season_id').eq("auth_id", authUser.user.id).single()

    if (publicUserCurrentSeason?.current_season_id) {


      return (
        <div>
          <h1 className="font-bold text-xl">Dashboard</h1>
          <h2 className="font-medium mt-1 text-lg">For All Games this Season</h2>

        </div>
      )
    } else {
      return (
        <CreateSeason />
      )
    }
  } else {
    return (
      <div className="flex flex-col gap-4 mt-4 ml-4">
        <div className="flex gap-2 items-center select-none cursor-default">
          <LogoSpan />
        </div>
        <div className="flex gap-4">
          <Link href={"/login"}><Button variant={"outline"}>Login</Button></Link>
        </div>
        <div>
          space for demo youtube video for alpha
        </div>
      </div>
    )
  }
}