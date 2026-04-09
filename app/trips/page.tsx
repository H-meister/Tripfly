import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

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

export default async function TripsPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="p-6 text-2xl font-bold">Your Trips</h1>

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
    </main>
  );
}