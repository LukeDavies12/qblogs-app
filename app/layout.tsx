import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
                <NavBar />
                <div className="mb-4">
                  {children}
                </div>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    )
}