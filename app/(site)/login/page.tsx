import { login, signup } from "./action"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <Card className="lg:w-1/2 mx-auto my-16">
      <CardHeader className="space-y-2">
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email and password below to log back in to your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="m@example.com" required type="email" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link className="ml-auto inline-block text-sm underline" href="#">
              Forgot your password?
            </Link>
          </div>
          <Input id="password" required type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        <Button className="w-full">Login</Button>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?
          <Link className="underline ml-2" href="#">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}