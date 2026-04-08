import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { auth } from "@/auth";
import SignOutButton from "@/components/SignOutButton";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata: Metadata = {
  title: "TripFly",
  description: "Plan trips with friends in one place",
};

const navItems = [
  { href: "/", label: "Home" },
  { href: "/trips", label: "Trips" },
  { href: "/itinerary", label: "Itinerary" },
  { href: "/budget", label: "Budget" },
  { href: "/packing", label: "Packing" },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_30%),linear-gradient(to_bottom,_#090909,_#000000)]">
          <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold text-white">
                TripFly
              </Link>

              <nav className="hidden items-center gap-2 lg:flex">
                {session &&
                  navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
              </nav>

              <div>
                {session ? (
                  <SignOutButton />
                ) : (
                  <Link
                    href="/signin"
                    className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}