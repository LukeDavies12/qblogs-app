"use client"

import { useFormStatus } from "react-dom";
import { CreateSpringGameAction } from "./gameAction";
import Link from "next/link";

export default function CreateSpringGame() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold">Create New Spring Game</h3>
      <form className="flex flex-col gap-1" action={CreateSpringGameAction}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" placeholder="2024 Spring Game" required />
        <label htmlFor="date">Full Name</label>
        <input type="date" name="date" id="date" required />
        <SubmitButton />
      </form>
      <Link href={"/"} className="px-8 py-2 w-full md:w-1/2 bg-neutral-100 text-neutral-700 underline text-center">Dashboard</Link>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button className="w-full md:w-1/2 font-medium bg-emerald-700 text-white rounded-sm px-8 py-2" type="submit" disabled={pending}>
      {pending ? "Creating" : "Create"} New Spring Game
    </button>
  );
};