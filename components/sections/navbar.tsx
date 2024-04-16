import LogoSpan from "./logo-span";
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="container px-4 mx-auto my-3">
      <nav className="flex justify-between items-center py-4">
        <div>
          <LogoSpan />
        </div>
        <div className="flex space-x-3 items-center">
          <Link href={"/login"}><Button variant={"link"}>Login</Button></Link>
          <Link href={"/sign-up"}><Button variant={"default"}>Sign Up</Button></Link>
        </div>
      </nav>
    </div>
  );
}