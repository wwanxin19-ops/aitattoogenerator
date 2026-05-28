-- AI Tattoo Generator - Credits & Generation History Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. Update profiles table (if not exists from auth-setup.sql)
-- ============================================
-- Note: profiles table is already created in auth-setup.sql
-- This ensures credits_remaining column exists

alter table if exists public.profiles
  add column if not exists credits_remaining integer not null default 10,
  add column if not exists plan_type text not null default 'free' check (plan_type in ('free', 'pro', 'studio')),
  add column if not exists credits_reset_at timestamptz not null default now();

-- ============================================
-- 2. Generation requests table (history)
-- ============================================
create table if not exists public.generation_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt text not null,
  style text,
  placement text,
  size text,
  color_mode text,
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  image_url text,
  credits_used integer not null default 1,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

-- Indexes
create index if not exists generation_requests_user_id_idx on public.generation_requests (user_id);
create index if not exists generation_requests_status_idx on public.generation_requests (status);
create index if not exists generation_requests_created_at_idx on public.generation_requests (created_at desc);
create index if not exists generation_requests_user_created_idx on public.generation_requests (user_id, created_at desc);

-- RLS
alter table public.generation_requests enable row level security;

create policy "Users can read own generation requests"
  on public.generation_requests for select
  using (auth.uid() = user_id);

-- ============================================
-- 3. Credit transactions table (audit log)
-- ============================================
create table if not exists public.credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount integer not null,
  type text not null check (type in ('daily_reset', 'generation', 'purchase', 'bonus', 'refund')),
  description text,
  generation_request_id uuid references public.generation_requests(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Indexes
create index if not exists credit_transactions_user_id_idx on public.credit_transactions (user_id);
create index if not exists credit_transactions_type_idx on public.credit_transactions (type);
create index if not exists credit_transactions_created_at_idx on public.credit_transactions (created_at desc);

-- RLS
alter table public.credit_transactions enable row level security;

create policy "Users can read own credit transactions"
  on public.credit_transactions for select
  using (auth.uid() = user_id);

-- ============================================
-- 4. Function: Reset daily credits
-- ============================================
create or replace function public.reset_daily_credits()
returns void as $$
declare
  free_credits integer := 10;
  pro_credits integer := 100;
begin
  update public.profiles
  set 
    credits_remaining = case 
      when plan_type = 'free' then free_credits
      when plan_type = 'pro' then pro_credits
      when plan_type = 'studio' then pro_credits
      else free_credits
    end,
    credits_reset_at = now()
  where credits_reset_at < date_trunc('day', now())
     or credits_reset_at is null;
end;
$$ language plpgsql security definer;

-- ============================================
-- 5. Function: Deduct credits for generation
-- ============================================
create or replace function public.deduct_generation_credits(
  p_user_id uuid,
  p_credits integer default 1
)
returns boolean as $$
declare
  current_credits integer;
begin
  -- Lock the row and get current credits
  select credits_remaining into current_credits
  from public.profiles
  where id = p_user_id
  for update;

  -- Check if user has enough credits
  if current_credits is null or current_credits < p_credits then
    return false;
  end if;

  -- Deduct credits
  update public.profiles
  set credits_remaining = credits_remaining - p_credits,
      updated_at = now()
  where id = p_user_id;

  -- Log transaction
  insert into public.credit_transactions (user_id, amount, type, description)
  values (p_user_id, -p_credits, 'generation', 'Tattoo generation');

  return true;
end;
$$ language plpgsql security definer;

-- ============================================
-- 6. Function: Add credits (for purchases/bonuses)
-- ============================================
create or replace function public.add_credits(
  p_user_id uuid,
  p_amount integer,
  p_type text,
  p_description text default null
)
returns void as $$
begin
  -- Add credits to profile
  update public.profiles
  set credits_remaining = credits_remaining + p_amount,
      updated_at = now()
  where id = p_user_id;

  -- Log transaction
  insert into public.credit_transactions (user_id, amount, type, description)
  values (p_user_id, p_amount, p_type, p_description);
end;
$$ language plpgsql security definer;

-- ============================================
-- 7. Grants
-- ============================================
grant usage on schema public to service_role;
grant select, insert, update on table public.profiles to service_role;
grant select, insert on table public.generation_requests to service_role;
grant select, insert on table public.credit_transactions to service_role;

-- Allow service role to execute functions
grant execute on function public.reset_daily_credits() to service_role;
grant execute on function public.deduct_generation_credits(uuid, integer) to service_role;
grant execute on function public.add_credits(uuid, integer, text, text) to service_role;
