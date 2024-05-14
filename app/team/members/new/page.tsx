"use client"

import "@/app/(auth)/auth.css"
import { useFormStatus } from "react-dom";

export default function Page() {
  return (
    <>
      <h1 className="font-bold">Invite New Member</h1>
      <form className="flex flex-col gap-1">
        <label htmlFor="full_name">Full Name</label>
        <input type="text" name="full_name" id="full_name" placeholder="Tom Brady" required />
        <label htmlFor="title">Title</label>
        <select name="title" id="title" className="mb-4" required>
          <option disabled selected hidden>Choose Their Title</option>
          <option value="Head Coach">QB</option>
          <option value="Head Coach">Head Coach</option>
          <option value="Offensive Coordinator">Offensive Coordinator</option>
          <option value="QB Coach">QB Coach</option>
          <option value="RB Coach">RB Coach</option>
          <option value="WR Coach">WR Coach</option>
          <option value="OL Coach">OL Coach</option>
        </select>
        <SubmitButton />
      </form>
    </>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="w-full md:w-96 font-medium bg-emerald-700 text-white rounded-sm px-8 py-2" type="submit" disabled={pending}>
      Send{pending ? "ing" : ""} Invite Email
    </button>
  );
};