"use client"

import { useFormStatus } from "react-dom"
import { Login } from "./action"

export default function Page() {
  return (
    <form action={Login}>
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <SubmitButton />
    </form>
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