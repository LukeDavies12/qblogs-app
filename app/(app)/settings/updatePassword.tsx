'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { ResetPasswordAction } from "./updatePasswordAction";
import { useRef } from "react";

export default function ResetPassword() {
  const ref = useRef<HTMLFormElement>(null);

  async function onUpdate(formData: FormData) {
    // check if password and confirmPassword are the same
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    await ResetPasswordAction(formData);

    ref?.current?.reset();
    alert("Password reset successfully");
  }

  return (
    <div className="flex flex-col gap-2 md:w-1/2">
      <h1 className="font-bold text-xl">Reset Password</h1>
      <form className="flex flex-col gap-1" action={onUpdate} ref={ref}>
        <Label htmlFor="password" className="mb-1">Password</Label>
        <Input type="password" name="password" id="password" placeholder="************" required />
        <Label htmlFor="confirmPassword" className="mb-1 mt-3">Confirm Password</Label>
        <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="************" required />
        <SubmitButton />
      </form>
    </div>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className='w-full mt-2' type="submit" disabled={pending}>
      {pending ? "Resetting" : "Reset"} Password
    </Button>
  );
}