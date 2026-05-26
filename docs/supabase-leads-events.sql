create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null check (source in ('pro', 'studio')),
  ip text,
  user_agent text,
  created_at timestamptz not null default now(),
  constraint leads_email_source_key unique (email, source)
);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create index if not exists leads_source_created_at_idx
  on public.leads (source, created_at desc);

create index if not exists leads_ip_created_at_idx
  on public.leads (ip, created_at desc);

alter table public.leads enable row level security;

grant usage on schema public to service_role;
grant select, insert on table public.leads to service_role;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event text not null check (event in ('cta_click', 'email_submit', 'pricing_click', 'generator_use')),
  source text,
  page text,
  metadata jsonb not null default '{}'::jsonb,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx
  on public.analytics_events (created_at desc);

create index if not exists analytics_events_event_created_at_idx
  on public.analytics_events (event, created_at desc);

create index if not exists analytics_events_source_created_at_idx
  on public.analytics_events (source, created_at desc);

create index if not exists analytics_events_ip_created_at_idx
  on public.analytics_events (ip, created_at desc);

alter table public.analytics_events enable row level security;

grant select, insert on table public.analytics_events to service_role;

-- The Next.js API routes write with SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- No anon insert/select policies are created, so browsers cannot write directly to Supabase.
