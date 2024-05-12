"use client"

import Image from "next/image"
import { useFormStatus } from "react-dom"
import { Login } from "./action"

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2 items-center select-none cursor-default">
          <Image src="/qblogs_logo_lightmode.svg" alt="logo" width={44} height={44} />
          <span className="font-bold text-lg">QB Logs</span>
        </div>
        <div>
          <form action={Login}>
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <SubmitButton />
          </form>
        </div>
      </div>
    </>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="w-full" type="submit" disabled={pending}>
      Log{pending ? "ging" : ""} in
    </button>
  );
};