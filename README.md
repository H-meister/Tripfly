# ✈️ TripFly

TripFly is a modern **Progressive Web App (PWA)** built with Next.js that helps you plan, organize, and manage trips with a clean, mobile-first experience.

---

## 🚀 Features

- 🔐 Authentication (Email & Password via Auth.js)
- 🧳 Trip management (create, view, organize trips)
- 🗺️ Itinerary planning
- 💰 Budget tracking
- 🎒 Packing lists
- 📱 Mobile-first design with desktop support
- 📦 Installable PWA (Add to Home Screen)

---

## 🛠️ Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Auth.js (NextAuth)
- Vercel (deployment)

---

## 📂 Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    signin/
    trips/
    itinerary/
    budget/
    packing/
    map/
    api/
      auth/[...nextauth]/
  components/
  lib/
  hooks/
  types/
public/
  icons/
```

## Environment variables

Create a `.env.local` with:

- `SUPABASE_URL`
- `SUPABASE_KEY` (or `SUPABASE_ANON_KEY`)
- `SERPAPI_API_KEY`

## Database migration

Run the SQL in `supabase/migrations/20260415_create_trips_table.sql` in your Supabase SQL editor to create the `trips` table and RLS policies.
