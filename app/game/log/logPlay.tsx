"use client"

import "@/app/(auth)/auth.css"
import { useFormStatus } from "react-dom";
import Link from "next/link";

export default function LogPlay() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold">Log Play</h1>
      <p className="md:w-1/2 text-neutral-700 -mt-3">Create an account for a new Coach or QB on your team.
       Once created give this person their login details and remind them to reset their password immediately.</p>
      <form className="flex flex-col gap-1" action={CreateNewMember}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" placeholder="tombrady@patriots.com" required />
        <label htmlFor="full_name">Full Name</label>
        <input type="text" name="full_name" id="full_name" placeholder="Tom Brady" required />
        <label htmlFor="title">Title</label>
        <select name="title" id="title" className="mb-4" required>
          <option disabled selected hidden>Choose Their Title</option>
          <option value="QB">QB</option>
          <option value="Head Coach">Head Coach</option>
          <option value="Offensive Coordinator">Offensive Coordinator</option>
          <option value="QB Coach">QB Coach</option>
          <option value="RB Coach">RB Coach</option>
          <option value="WR Coach">WR Coach</option>
          <option value="OL Coach">OL Coach</option>
        </select>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" placeholder="************" required />
        <SubmitButton />
      </form>
      <Link href={"/team"} className="px-8 py-2 w-full md:w-1/2 bg-neutral-100 text-emerald-700 underline text-center">View Members</Link>
      <Link href={"/"} className="px-8 py-2 w-full md:w-1/2 bg-neutral-100 text-neutral-700 underline text-center">Dashboard</Link>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="w-full md:w-1/2 font-medium bg-emerald-700 text-white rounded-sm px-8 py-2" type="submit" disabled={pending}>
      {pending ? "Logging" : "Log"} Play 
    </button>
  );
};