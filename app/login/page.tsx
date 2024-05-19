"use client"

import Image from "next/image"
import { useFormStatus } from "react-dom"
import { Login } from "./action"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LockIcon } from "lucide-react"
import LogoSpan from "@/components/LogoSpan"

export default function Page() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <div className="flex gap-2 items-center justify-center select-none cursor-default">
            <LogoSpan />
          </div>
          <h2 className="mt-6 text-center font-bold text-lg tracking-tight text-neutral-900 dark:text-neutral-50">
            Sign in to your account
          </h2>
        </div>
        <form action={Login} className="space-y-6">
          <div>
            <Label className="sr-only" htmlFor="email">
              Email address
            </Label>
            <Input
              autoComplete="email"
              className="relative block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-neutral-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder-neutral-400"
              id="email"
              name="email"
              placeholder="Email address"
              required
              type="email"
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              autoComplete="current-password"
              className="relative block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-neutral-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder-neutral-400"
              id="password"
              name="password"
              placeholder="Password"
              required
              type="password"
            />
          </div>
          <div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full"
    >
      Log{pending ? "ging" : ""} in
    </Button>
  );
};