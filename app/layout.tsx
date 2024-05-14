import Link from "next/link";
import "./globals.css";
import { createClient } from "@/utils/supabase/server"
import Image from "next/image"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()

  const { data: authUser } = await supabase.auth.getUser()

  if (authUser?.user) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className="container mx-auto px-4 sm:px-0">
          <nav className="border-b border-neutral-300 py-1">
            <Link href={"/"} className="flex gap-2 items-center">
              <Image src="/qblogs_logo_lightmode.svg" alt="logo" width={32} height={32} />
              <span className="font-medium">QB Logs</span>
            </Link>
          </nav>
          {children}
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className="container mx-auto px-4 sm:px-0">
          {children}
        </body>
      </html>
    );
  }
}
