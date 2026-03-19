create table if not exists public.assistant_leads (
  id uuid primary key default gen_random_uuid(),
  "submittedAt" timestamptz not null default now(),
  locale text not null check (locale in ('fr', 'en', 'de')),
  action text not null check (action in ('summary_email', 'human_followup', 'glpi_ticket')),
  intent text not null check (intent in ('project_quote', 'support_glpi', 'faq', 'general_info', 'unknown')),
  "projectType" text not null,
  score text not null check (score in ('hot', 'medium', 'low', 'support_urgent', 'out_of_scope')),
  "scoreLabel" text not null,
  "scoreReason" text not null,
  "humanNeeded" boolean not null default false,
  email text null,
  name text null,
  consent boolean not null default false,
  summary jsonb not null,
  transcript jsonb not null default '[]'::jsonb,
  status text not null default 'new' check (status in ('new', 'processed'))
);

create index if not exists assistant_leads_submitted_at_idx on public.assistant_leads ("submittedAt" desc);
create index if not exists assistant_leads_score_idx on public.assistant_leads (score);
create index if not exists assistant_leads_action_idx on public.assistant_leads (action);
create index if not exists assistant_leads_email_idx on public.assistant_leads (email);
