-- Tracking: opens et clicks sur les emails de prospection
alter table public.prospects
  add column if not exists "trackingId"  text unique default gen_random_uuid()::text,
  add column if not exists "openedAt"    timestamptz,
  add column if not exists "clickedAt"   timestamptz,
  add column if not exists "repliedAt"   timestamptz,
  add column if not exists language      text default 'fr',
  add column if not exists country       text,
  add column if not exists "screenshotUrl" text;

-- Log de chaque batch cron (matin / midi / soir)
create table if not exists public.prospect_batches (
  id uuid primary key default gen_random_uuid(),
  "runAt" timestamptz not null default now(),
  slot text not null check (slot in ('morning', 'noon', 'evening')),
  found int not null default 0,
  sent  int not null default 0,
  errors jsonb not null default '[]'::jsonb
);

create index if not exists prospect_batches_run_at_idx on public.prospect_batches ("runAt" desc);
create index if not exists prospects_tracking_id_idx on public.prospects ("trackingId");
