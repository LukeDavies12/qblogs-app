import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getUserData } from "@/data/users/teamUsersDTO";
import { createClient } from "@/utils/supabase/server";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()
  const { data: authUser } = await supabase.auth.getUser()

  if (authUser.user?.id) {
    const userData = await getUserData(authUser.user.id);
    
    return (
      <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex">
              <Sidebar />
              <div className="w-full container px-4 mx-auto">
                <NavBar userData={userData} />
                <div className="mt-4 mb-4">
                  {children}
                </div>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div>
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    );
  }
}