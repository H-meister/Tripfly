import Link from "next/link";
import IOSInstallPrompt from "@/components/IOSInstallPrompt";

type Trip = {
  id: string;
  name: string;
  location: string;
  date: string;
  status: string;
};

const trips: Trip[] = [
  {
    id: "1",
    name: "Tokyo Adventure",
    location: "Tokyo, Japan",
    date: "Oct 12 - Oct 20",
    status: "8 days left",
  },
  {
    id: "2",
    name: "Cancún Getaway",
    location: "Cancún, Mexico",
    date: "Dec 5 - Dec 10",
    status: "Planned",
  },
  {
    id: "3",
    name: "Kyoto Weekend",
    location: "Kyoto, Japan",
    date: "Jan 14 - Jan 17",
    status: "Draft",
  },
];

const quickLinks = [
  {
    href: "/itinerary",
    title: "Itinerary",
    subtitle: "Organize your day-by-day plans",
    icon: "🗺️",
  },
  {
    href: "/budget",
    title: "Budget",
    subtitle: "Track shared costs and spending",
    icon: "💰",
  },
  {
    href: "/packing",
    title: "Packing",
    subtitle: "Keep your essentials in one place",
    icon: "🎒",
  },
  {
    href: "/map",
    title: "Map",
    subtitle: "Save locations and spots to visit",
    icon: "📍",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-6 pb-28 sm:px-6 lg:px-10 lg:py-10 lg:pb-10">
      <IOSInstallPrompt />
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.3fr_0.9fr]">
        <section className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="mb-2 text-xs uppercase tracking-[0.28em] text-zinc-500">
                  TripFly
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Plan your next adventure in one place.
                </h1>
                <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
                  Build itineraries, manage your budget, keep a packing list,
                  and organize trips with a layout that feels like an app on
                  mobile and a dashboard on desktop.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/trips"
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                >
                  + Create New Trip
                </Link>

                <Link
                  href="/trips"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.08]"
                >
                  View All Trips
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.28)] sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Upcoming Trips
                </h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Your saved and upcoming travel plans
                </p>
              </div>

              <Link
                href="/trips"
                className="text-sm font-medium text-zinc-400 transition hover:text-white"
              >
                See all
              </Link>
            </div>

            <div className="grid gap-4 xl:grid-cols-2">
              {trips.map((trip) => (
                <Link key={trip.id} href={`/trips/${trip.id}`} className="block">
                  <article className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 to-black p-5 transition hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_14px_34px_rgba(0,0,0,0.35)]">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {trip.name}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          {trip.location}
                        </p>
                      </div>

                      <span className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-zinc-300">
                        {trip.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-zinc-400">
                      <span>{trip.date}</span>
                      <span className="font-medium text-white">Open →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.28)] sm:p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white">Quick Access</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Jump into the main planning tools
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {quickLinks.map((item) => (
                <Link key={item.title} href={item.href} className="block">
                  <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.07]">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-black shadow-md">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">
                      {item.subtitle}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.28)] sm:p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              Travel Snapshot
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-2xl font-bold text-white">3</p>
                <p className="mt-1 text-xs text-zinc-400">Trips</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-2xl font-bold text-white">12</p>
                <p className="mt-1 text-xs text-zinc-400">Items</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <p className="text-2xl font-bold text-white">$860</p>
                <p className="mt-1 text-xs text-zinc-400">Budget</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm font-medium text-white">
                Keep TripFly simple at first
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Start with trip creation, itinerary, budget, and packing. Once
                that feels solid, you can add collaboration, offline features,
                and shared trip editing.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
