import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabaseClient";
import { getFlightOptions, type FlightOption } from "@/lib/serpapi";

type StoredTrip = {
  id: string;
  trip_name: string;
  origin_airport_code: string;
  destination_airport_code: string;
  start_date: string;
  end_date: string;
  flight_options: FlightOption[] | null;
  created_at: string;
};

async function createTrip(formData: FormData) {
  "use server";

  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!session || !userId) {
    redirect("/signin");
  }

  const tripName = String(formData.get("tripName") ?? "").trim();
  const originAirportCode = String(formData.get("originAirportCode") ?? "")
    .trim()
    .toUpperCase();
  const destinationAirportCode = String(
    formData.get("destinationAirportCode") ?? ""
  )
    .trim()
    .toUpperCase();
  const startDate = String(formData.get("startDate") ?? "");
  const endDate = String(formData.get("endDate") ?? "");

  if (
    !tripName ||
    !originAirportCode ||
    !destinationAirportCode ||
    !startDate ||
    !endDate
  ) {
    throw new Error("All fields are required.");
  }

  if (startDate > endDate) {
    throw new Error("Trip end date must be after start date.");
  }

  const flightOptions = await getFlightOptions({
    departureAirportCode: originAirportCode,
    arrivalAirportCode: destinationAirportCode,
    startDate,
    endDate,
  });

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from("trips").insert({
    user_id: userId,
    trip_name: tripName,
    origin_airport_code: originAirportCode,
    destination_airport_code: destinationAirportCode,
    start_date: startDate,
    end_date: endDate,
    flight_options: flightOptions,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/trips");
}

export default async function TripsPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;

  if (!session || !userId) {
    redirect("/signin");
  }

  const supabase = createSupabaseServerClient();
  const { data: trips, error } = await supabase
    .from("trips")
    .select(
      "id, trip_name, origin_airport_code, destination_airport_code, start_date, end_date, flight_options, created_at"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="space-y-8 p-6 text-white">
      <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
        <h1 className="text-2xl font-bold">Create a trip</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Add a trip and we&apos;ll pull Google Flights options for your selected
          dates.
        </p>

        <form action={createTrip} className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            name="tripName"
            placeholder="Trip name"
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-white/30"
            required
          />
          <input
            name="originAirportCode"
            placeholder="Origin airport code (e.g. JFK)"
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm uppercase outline-none focus:border-white/30"
            minLength={3}
            maxLength={3}
            required
          />
          <input
            name="destinationAirportCode"
            placeholder="Destination airport code (e.g. LHR)"
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm uppercase outline-none focus:border-white/30"
            minLength={3}
            maxLength={3}
            required
          />
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <input
              name="startDate"
              type="date"
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-white/30"
              required
            />
            <input
              name="endDate"
              type="date"
              className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-white/30"
              required
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Save trip and find flights
          </button>
        </form>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.28)]">
        <h2 className="text-xl font-semibold">Your Trips</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Flights are sourced from SerpApi&apos;s Google Flights API and stored
          with each trip.
        </p>

        <div className="mt-5 grid gap-4">
          {(trips as StoredTrip[] | null)?.length ? (
            trips?.map((trip) => (
              <article
                key={trip.id}
                className="rounded-2xl border border-white/10 bg-black/40 p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{trip.trip_name}</h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300">
                    {trip.start_date} → {trip.end_date}
                  </span>
                </div>
                <p className="mt-2 text-sm text-zinc-400">
                  {trip.origin_airport_code} → {trip.destination_airport_code}
                </p>

                <div className="mt-4 grid gap-3">
                  {trip.flight_options?.length ? (
                    trip.flight_options.map((flight, index) => (
                      <div
                        key={`${trip.id}-flight-${index}`}
                        className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm"
                      >
                        <p className="font-medium text-white">
                          {flight.airline} ({flight.flightNumber})
                        </p>
                        <p className="mt-1 text-zinc-400">
                          {flight.departureAirport} {flight.departureTime} →{" "}
                          {flight.arrivalAirport} {flight.arrivalTime}
                        </p>
                        <p className="mt-1 text-zinc-400">
                          {flight.totalPrice ?? "Price unavailable"} •{" "}
                          {flight.durationMinutes
                            ? `${flight.durationMinutes} min`
                            : "Duration unavailable"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-500">
                      No flight options were returned for this trip.
                    </p>
                  )}
                </div>
              </article>
            ))
          ) : (
            <p className="text-sm text-zinc-500">No trips yet. Create one above.</p>
          )}
        </div>
      </section>
    </main>
  );
}
