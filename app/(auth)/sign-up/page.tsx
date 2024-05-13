"use client"

import Image from "next/image"
import { useFormStatus } from "react-dom"
import { SignUp } from "./action"
import "../auth.css"

export default function Page() {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2 items-center select-none cursor-default">
          <Image src="/qblogs_logo_lightmode.svg" alt="logo" width={44} height={44} />
          <span className="font-bold text-lg">QB Logs</span>
        </div>
        <div>
          <h1 className="font-bold text-2xl">Sign Up</h1>
        </div>
        <div>
          <form action={SignUp}>
            <div className="flex flex-col gap-4">
              <label htmlFor="full_name">Full Name</label>
              <input type="text" name="full_name" id="full_name" placeholder="Coach John" />
              <label htmlFor="title">Title</label>
              <select name="title" id="title" className="w-full">
                <option value="Head Coach">Head Coach</option>
                <option value="Offensive Coordinator">Offensive Coordinator</option>
                <option value="QB Coach">QB Coach</option>
                <option value="RB Coach">RB Coach</option>
                <option value="WR Coach">WR Coach</option>
                <option value="OL Coach">OL Coach</option>
              </select>

              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="coachjohn@school.edu" className="w-full" />
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" placeholder="************" />
              <label htmlFor="team_name">Team Name</label>
              <input type="text" name="team_name" id="team_name" placeholder="New England Patriots" />
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="w-full font-medium bg-emerald-700 text-white rounded-sm px-8 py-2" type="submit" disabled={pending}>
      Sign{pending ? "ing" : ""} Up
    </button>
  );
};