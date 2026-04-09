import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";
import IOSInstallPrompt from "@/components/IOSInstallPrompt";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-black px-4 py-8 text-white sm:px-6 lg:px-8">
      <IOSInstallPrompt />
      <div className="mx-auto grid min-h-[80vh] max-w-6xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] lg:grid-cols-2">
        <section className="hidden border-r border-white/10 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              TripFly
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white">
              Travel planning,
              <br />
              all in one place.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
              Organize trips, build itineraries, track budgets, and manage
              packing lists.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm text-zinc-500">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                Sign in to TripFly
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Use your email and password to access your trips.
              </p>
            </div>

            <form
              action={async (formData) => {
                "use server";

                try {
                  await signIn("credentials", {
                    email: formData.get("email"),
                    password: formData.get("password"),
                    redirectTo: "/",
                  });
                } catch (error) {
                  if (error instanceof AuthError) {
                    redirect("/signin?error=InvalidCredentials");
                  }
                  throw error;
                }
              }}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="demo@tripfly.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white/20"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="password123"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-400">
              Demo login:
              <br />
              <span className="text-white">demo@tripfly.com</span>
              <br />
              <span className="text-white">password123</span>
            </div>

            <div className="mt-6 text-sm text-zinc-500">
              <Link href="/" className="transition hover:text-white">
                ← Back to home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
