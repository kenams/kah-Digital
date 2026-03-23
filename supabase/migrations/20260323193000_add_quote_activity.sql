create table if not exists public.quote_activity (
  id uuid primary key default gen_random_uuid(),
  "quoteId" uuid references public.quotes(id) on delete cascade,
  "quoteSubmittedAt" timestamptz not null,
  "createdAt" timestamptz not null default now(),
  "actorUserId" text,
  "actorEmail" text,
  action text not null,
  summary text not null,
  payload jsonb not null default '{}'::jsonb
);

create index if not exists quote_activity_quote_id_idx
  on public.quote_activity ("quoteId", "createdAt" desc);

create index if not exists quote_activity_submitted_at_idx
  on public.quote_activity ("quoteSubmittedAt", "createdAt" desc);
