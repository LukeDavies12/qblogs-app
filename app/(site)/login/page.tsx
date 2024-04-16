import { login } from "./action"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <Card className="lg:w-1/2 mx-auto my-16">
      <form>
        <CardHeader className="space-y-2">
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your email and password below to log back in to your account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="m@example.com" required type="email" />
          </div>
          <div className="relative space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Forgot your password?
              </Link>
            </div>
            <div className="relative">
              <Input id="password" required type="password" />
              <Button className="absolute top-1 right-1 h-7 w-7" size="icon" variant="ghost" type="button">
                <EyeIcon className="h-4 w-4" />
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col">
          <Button className="w-full" formAction={login} type="submit">Login</Button>
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

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}