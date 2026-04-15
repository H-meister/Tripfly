import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import IOSInstallPrompt from "@/components/IOSInstallPrompt";
import { createSupabaseServerClient } from "@/lib/supabaseClient";

type SignUpSearchParams = Promise<{
  error?: string;
}>;

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: SignUpSearchParams;
}) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  const { error } = await searchParams;

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
              Create your account,
              <br />
              start planning faster.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
              Sign up with your email and password to save trips, itineraries,
              and budgets securely.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm text-zinc-500">Welcome to TripFly</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Use your name, email, and password to create your login.
              </p>
            </div>

            {error ? (
              <p className="mb-5 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                {decodeURIComponent(error)}
              </p>
            ) : null}

            <form
              action={async (formData) => {
                "use server";

                const name = String(formData.get("name") ?? "").trim();
                const email = String(formData.get("email") ?? "").trim();
                const password = String(formData.get("password") ?? "");

                const supabase = createSupabaseServerClient();
                const { error } = await supabase.auth.signUp({
                  email,
                  password,
                  options: {
                    data: {
                      name,
                    },
                  },
                });

                if (error) {
                  redirect(`/signup?error=${encodeURIComponent(error.message)}`);
                }

                redirect("/signin?message=AccountCreated");
              }}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white/20"
                  minLength={2}
                  required
                />
              </div>

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
                  placeholder="you@tripfly.com"
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
                  placeholder="At least 8 characters"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-white/20"
                  minLength={8}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-sm text-zinc-500">
              Already have an account?{" "}
              <Link href="/signin" className="text-white transition hover:text-zinc-300">
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
