-- AI Tattoo Generator - Auth & Profiles Schema
-- Run this in Supabase SQL Editor after enabling Auth

-- Profiles table (extends Supabase Auth users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  avatar_url text,
  plan_type text not null default 'free' check (plan_type in ('free', 'pro', 'studio')),
  credits_remaining integer not null default 10,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists profiles_plan_type_idx on public.profiles (plan_type);
create index if not exists profiles_created_at_idx on public.profiles (created_at desc);

-- RLS policies
alter table public.profiles enable row level security;

-- Users can read own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger: auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Attach trigger to auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Grant access to service role (for server-side operations)
grant usage on schema public to service_role;
grant select, insert, update on table public.profiles to service_role;
