import LogoSpan from "@/components/LogoSpan";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthUser {
  user?: any; // Define the type of 'user' as needed
}

export function AuthCheck({ authUser, children }: { authUser: AuthUser, children: React.ReactNode }) {
  if (!authUser?.user) {
    return (
      <div className="flex flex-col gap-4 mt-4 ml-4">
        <div className="flex gap-2 items-center select-none cursor-default">
          <LogoSpan />
        </div>
        <div className="flex gap-4">
          <Link href="/login"><Button variant="outline">Login</Button></Link>
        </div>
      </div>
    );
  }

  return children;
}