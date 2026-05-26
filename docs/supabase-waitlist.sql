create extension if not exists pgcrypto;

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null check (source in ('pro', 'studio')),
  ip text,
  user_agent text,
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_source_key unique (email, source)
);

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

create index if not exists waitlist_signups_source_created_at_idx
  on public.waitlist_signups (source, created_at desc);

create index if not exists waitlist_signups_ip_created_at_idx
  on public.waitlist_signups (ip, created_at desc);

alter table public.waitlist_signups enable row level security;

-- The Next.js API route writes with SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS.
-- No anon insert/select policy is created so browsers cannot write directly to Supabase.
