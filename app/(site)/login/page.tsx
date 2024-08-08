"use client"
import LogoSpan from "@/components/brand/LogoSpan"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { Login, sendResetPasswordEmail } from "./action"

export default function Page() {
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetEmailStatus, setResetEmailStatus] = useState<{ success?: boolean; message?: string } | null>(null)

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <div className="flex gap-2 items-center justify-center select-none cursor-default">
            <LogoSpan />
          </div>
          <h2 className="mt-6 text-center font-bold text-lg tracking-tight text-neutral-900 dark:text-neutral-50">
            {showResetForm ? "Reset your password" : "Sign in to your account"}
          </h2>
        </div>
        {showResetForm ? (
          <ResetPasswordForm 
            setShowResetForm={setShowResetForm}
            resetEmailStatus={resetEmailStatus}
            setResetEmailStatus={setResetEmailStatus}
          />
        ) : (
          <SignInForm setShowResetForm={setShowResetForm} />
        )}
      </div>
    </div>
  )
}

const SignInForm = ({ setShowResetForm }: {
  setShowResetForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
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
      <div className="text-center">
        <button
          type="button"
          onClick={() => setShowResetForm(true)}
          className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
        >
          Forgot your password?
        </button>
      </div>
    </form>
  )
}

const ResetPasswordForm = ({ 
  setShowResetForm,
  resetEmailStatus,
  setResetEmailStatus
}: {
  setShowResetForm: React.Dispatch<React.SetStateAction<boolean>>;
  resetEmailStatus: { success?: boolean; message?: string } | null;
  setResetEmailStatus: React.Dispatch<React.SetStateAction<{ success?: boolean; message?: string } | null>>;
}) => {
  const [email, setEmail] = useState("")

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await sendResetPasswordEmail(email)
    setResetEmailStatus(result)
  }

  return (
    <form onSubmit={handleResetPassword} className="space-y-6">
      <div>
        <Label className="sr-only" htmlFor="reset-email">
          Email address
        </Label>
        <Input
          autoComplete="email"
          className="relative block w-full appearance-none rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:z-10 focus:border-neutral-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:placeholder-neutral-400"
          id="reset-email"
          name="email"
          placeholder="Email address"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Button type="submit" className="w-full">
          Send Password Reset Email
        </Button>
      </div>
      {resetEmailStatus && (
        <div className={`text-sm text-center ${resetEmailStatus.success ? 'text-green-600' : 'text-red-600'}`}>
          {resetEmailStatus.message}
        </div>
      )}
      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setShowResetForm(false)
            setResetEmailStatus(null)
          }}
          className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
        >
          Back to sign in
        </button>
      </div>
    </form>
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