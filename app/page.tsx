import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2 items-center select-none cursor-default">
          <Image src="/qblogs_logo_lightmode.svg" alt="logo" width={44} height={44} />
          <span className="font-bold text-lg">QB Logs</span>
        </div>
        <div className="flex gap-4">
          <Link href={"/sign-up"}><button className="px-8 py-2 font-medium bg-emerald-700 text-white rounded-sm">Sign Up</button></Link>
          <Link href={"/login"}><button className="px-8 py-2 font-medium bg-neutral-100 text-emereald-700 rounded-sm">Login</button></Link>
        </div>
        <div>
          space for demo youtube video for alpha
        </div>
      </div>
    </>
  )
}