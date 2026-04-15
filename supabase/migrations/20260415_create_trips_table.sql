create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trip_name text not null,
  origin_airport_code text not null,
  destination_airport_code text not null,
  start_date date not null,
  end_date date not null,
  flight_options jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists trips_user_id_created_at_idx
  on public.trips(user_id, created_at desc);

alter table public.trips enable row level security;

create policy "users can insert their own trips"
  on public.trips
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "users can view their own trips"
  on public.trips
  for select
  to authenticated
  using (auth.uid() = user_id);
