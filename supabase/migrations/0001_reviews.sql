-- Reviews submitted by clients through the website.
-- Run this in your Supabase project (SQL Editor) before going live.

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  body        text not null check (char_length(body) between 3 and 500),
  tag         text check (char_length(tag) <= 60),
  status      text not null default 'pending'
              check (status in ('pending', 'approved', 'rejected')),
  created_at  timestamptz not null default now()
);

-- Newest-first reads of approved reviews.
create index if not exists reviews_approved_created_idx
  on public.reviews (created_at desc)
  where status = 'approved';

alter table public.reviews enable row level security;

-- Anyone (anon) may submit a review, but ONLY as 'pending'.
-- They cannot self-publish by passing status = 'approved'.
drop policy if exists "anon can submit pending reviews" on public.reviews;
create policy "anon can submit pending reviews"
  on public.reviews
  for insert
  to anon
  with check (status = 'pending');

-- The public may read ONLY approved reviews.
drop policy if exists "public can read approved reviews" on public.reviews;
create policy "public can read approved reviews"
  on public.reviews
  for select
  to anon
  using (status = 'approved');

-- Moderation (approve / reject) is done by you in the Supabase dashboard
-- (Table Editor → set status to 'approved'), which uses the service role
-- and bypasses RLS. No public update/delete policies are granted on purpose.
