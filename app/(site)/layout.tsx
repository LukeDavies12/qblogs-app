import Navbar from "@/components/sections/navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">
        {children}
      </main>
    </>
  );
}