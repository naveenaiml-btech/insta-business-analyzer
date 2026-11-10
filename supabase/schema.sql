create table if not exists analyses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  instagram_url text not null,
  username text not null,
  business_name text,
  category text,
  services text[] default '{}',
  content_themes text[] default '{}',
  target_audience text,
  contact_info jsonb default '{}',
  interest_level text,
  tags text[] default '{}',
  recommended_action text,
  summary text,
  raw_profile jsonb
);

-- DEMO ONLY: open access so the app works without login.
alter table analyses enable row level security;
create policy "demo read" on analyses for select using (true);
create policy "demo insert" on analyses for insert with check (true);

-- PRODUCTION: add user_id uuid references auth.users, delete the two
-- demo policies above, and use:
-- create policy "own rows" on analyses
--   for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
