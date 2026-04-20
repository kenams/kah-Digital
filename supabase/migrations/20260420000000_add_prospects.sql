create table if not exists public.prospects (
  id uuid primary key default gen_random_uuid(),
  "createdAt" timestamptz not null default now(),
  "businessName" text,
  website text not null,
  email text,
  sector text,
  status text not null default 'pending'
    check (status in ('pending', 'analyzing', 'analyzed', 'draft', 'sent', 'replied', 'rejected')),
  audit jsonb,
  "emailSubject" text,
  "emailBody" text,
  "sentAt" timestamptz,
  notes text
);

create index if not exists prospects_status_idx on public.prospects (status);
create index if not exists prospects_created_at_idx on public.prospects ("createdAt" desc);
create index if not exists prospects_email_idx on public.prospects (email);
