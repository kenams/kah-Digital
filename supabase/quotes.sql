create extension if not exists pgcrypto;

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  submittedAt timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  projectType text not null,
  goal text not null,
  pages text[] not null default '{}',
  mobilePlatforms text[] not null default '{}',
  mobileFeatures text[] not null default '{}',
  storeSupport text,
  techPreferences text,
  inspirations text,
  budget text not null,
  timeline text not null,
  message text,
  clientType text,
  companyName text,
  projectFocus text,
  configurator jsonb,
  feasibility text not null default 'pending',
  deposit text not null default 'none'
);

create index if not exists quotes_submitted_at_idx on public.quotes (submittedAt desc);
