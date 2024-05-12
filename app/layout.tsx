import { createClient } from '@/utils/supabase/server';
import { Inter as FontSans } from "next/font/google";
import { redirect } from "next/navigation";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontSans.className}>
        {children}
      </body>
    </html>
  );
}
