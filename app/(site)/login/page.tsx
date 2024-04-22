"use client"

import { login } from "./action"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useFormState, useFormStatus } from "react-dom"
import AuthFormError from "@/components/auth/auth-form-error"

export default function LoginPage() {
  const [state, formAction] = useFormState(login, {
    error: "",
  });

  return (
    <Card className="lg:w-1/2 mx-auto my-16">
      <form action={login}>
        <CardHeader className="space-y-2">
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your email and password below to log back in to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AuthFormError state={false} />
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="m@example.com" required type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" required type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex-col">
          <SubmitButton />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link className="underline ml-2" href="#">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" type="submit" disabled={pending}>
      Log{pending ? "ging" : ""} in
    </Button>
  );
};