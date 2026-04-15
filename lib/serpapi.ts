export type FlightOption = {
  airline: string;
  flightNumber: string;
  durationMinutes: number | null;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  totalPrice: string | null;
  travelClass: string | null;
  carbonEmissionsKg: number | null;
};

type SerpApiFlightSegment = {
  airline?: string;
  flight_number?: string;
  departure_airport?: {
    id?: string;
    time?: string;
  };
  arrival_airport?: {
    id?: string;
    time?: string;
  };
  duration?: number;
  travel_class?: string;
};

type SerpApiFlightResult = {
  price?: number;
  flights?: SerpApiFlightSegment[];
  carbon_emissions?: {
    this_flight?: number;
  };
};

type SerpApiFlightsResponse = {
  best_flights?: SerpApiFlightResult[];
  other_flights?: SerpApiFlightResult[];
};

function mapFlightOption(result: SerpApiFlightResult): FlightOption | null {
  const firstSegment = result.flights?.[0];
  const lastSegment = result.flights?.[result.flights.length - 1];

  if (!firstSegment || !lastSegment) {
    return null;
  }

  return {
    airline: firstSegment.airline ?? "Unknown airline",
    flightNumber: firstSegment.flight_number ?? "N/A",
    durationMinutes: firstSegment.duration ?? null,
    departureTime: firstSegment.departure_airport?.time ?? "Unknown",
    arrivalTime: lastSegment.arrival_airport?.time ?? "Unknown",
    departureAirport: firstSegment.departure_airport?.id ?? "N/A",
    arrivalAirport: lastSegment.arrival_airport?.id ?? "N/A",
    totalPrice:
      typeof result.price === "number" ? `$${result.price.toFixed(2)}` : null,
    travelClass: firstSegment.travel_class ?? null,
    carbonEmissionsKg: result.carbon_emissions?.this_flight ?? null,
  };
}

export async function getFlightOptions(params: {
  departureAirportCode: string;
  arrivalAirportCode: string;
  startDate: string;
  endDate: string;
}) {
  const apiKey = process.env.SERPAPI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing SERPAPI_API_KEY.");
  }

  const queryParams = new URLSearchParams({
    engine: "google_flights",
    departure_id: params.departureAirportCode,
    arrival_id: params.arrivalAirportCode,
    outbound_date: params.startDate,
    return_date: params.endDate,
    currency: "USD",
    hl: "en",
    gl: "us",
    api_key: apiKey,
  });

  const response = await fetch(`https://serpapi.com/search.json?${queryParams}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`SerpApi error: ${response.status}`);
  }

  const data = (await response.json()) as SerpApiFlightsResponse;
  const combined = [...(data.best_flights ?? []), ...(data.other_flights ?? [])];

  return combined
    .map(mapFlightOption)
    .filter((flight): flight is FlightOption => Boolean(flight))
    .slice(0, 5);
}
