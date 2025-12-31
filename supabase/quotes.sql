create extension if not exists pgcrypto;

create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  "submittedAt" timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  "projectType" text not null,
  goal text not null,
  pages text[] not null default '{}',
  "mobilePlatforms" text[] not null default '{}',
  "mobileFeatures" text[] not null default '{}',
  "storeSupport" text,
  "techPreferences" text,
  inspirations text,
  budget text not null,
  timeline text not null,
  message text,
  "clientType" text,
  "companyName" text,
  "projectFocus" text,
  configurator jsonb,
  feasibility text not null default 'pending',
  deposit text not null default 'none'
);

do $$
begin
  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='submittedat')
     and not exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='submittedAt') then
    alter table public.quotes rename column submittedat to "submittedAt";
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='projecttype')
     and not exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='projectType') then
    alter table public.quotes rename column projecttype to "projectType";
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='mobileplatforms')
     and not exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='mobilePlatforms') then
    alter table public.quotes rename column mobileplatforms to "mobilePlatforms";
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='mobilefeatures')
     and not exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='mobileFeatures') then
    alter table public.quotes rename column mobilefeatures to "mobileFeatures";
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='storesupport')
     and not exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='storeSupport') then
    alter table public.quotes rename column storesupport to "storeSupport";
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='techpreferences')
     and not exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='techPreferences') then
    alter table public.quotes rename column techpreferences to "techPreferences";
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='clienttype')
     and not exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='clientType') then
    alter table public.quotes rename column clienttype to "clientType";
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='companyname')
     and not exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='companyName') then
    alter table public.quotes rename column companyname to "companyName";
  end if;

  if exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='projectfocus')
     and not exists (select 1 from information_schema.columns where table_schema='public' and table_name='quotes' and column_name='projectFocus') then
    alter table public.quotes rename column projectfocus to "projectFocus";
  end if;
end $$;

alter table public.quotes
  add column if not exists "submittedAt" timestamptz default now(),
  add column if not exists "projectType" text,
  add column if not exists "mobilePlatforms" text[] default '{}',
  add column if not exists "mobileFeatures" text[] default '{}',
  add column if not exists "storeSupport" text,
  add column if not exists "techPreferences" text,
  add column if not exists "clientType" text,
  add column if not exists "companyName" text,
  add column if not exists "projectFocus" text,
  add column if not exists configurator jsonb,
  add column if not exists feasibility text default 'pending',
  add column if not exists deposit text default 'none',
  add column if not exists pages text[] default '{}';

create index if not exists quotes_submitted_at_idx on public.quotes ("submittedAt" desc);
