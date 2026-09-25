-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query).
-- Sets up anonymous-visitor live chat: each visitor gets a real (anonymous)
-- Supabase auth identity, and Row Level Security scopes every visitor to
-- only ever see their own conversation. Dhruv's replies go through the
-- server-side service-role client (src/lib/supabase/admin.ts), which
-- bypasses RLS entirely, so there are no admin-facing policies below.

create extension if not exists "pgcrypto";

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  visitor_uid uuid not null references auth.users(id) on delete cascade,
  visitor_name text,
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  unread_by_admin boolean not null default true
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender text not null check (sender in ('visitor', 'dhruv')),
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists messages_conversation_id_idx on messages (conversation_id, created_at);

alter table conversations enable row level security;
alter table messages enable row level security;

-- Visitors can create exactly one row for themselves...
create policy "visitor can create own conversation"
  on conversations for insert
  to authenticated
  with check (visitor_uid = auth.uid());

-- ...and can only ever read their own conversation back.
create policy "visitor can read own conversation"
  on conversations for select
  to authenticated
  using (visitor_uid = auth.uid());

-- Visitors can send messages only into their own conversation, and only
-- ever as themselves (never impersonate 'dhruv').
create policy "visitor can send into own conversation"
  on messages for insert
  to authenticated
  with check (
    sender = 'visitor'
    and exists (
      select 1 from conversations c
      where c.id = conversation_id and c.visitor_uid = auth.uid()
    )
  );

-- Visitors can read every message (both sides) in their own conversation,
-- which is what makes Dhruv's replies show up live.
create policy "visitor can read own conversation messages"
  on messages for select
  to authenticated
  using (
    exists (
      select 1 from conversations c
      where c.id = conversation_id and c.visitor_uid = auth.uid()
    )
  );

-- Keep conversations.last_message_at fresh and flag unread state whenever
-- a message is inserted, so the admin inbox can sort/badge without extra
-- round-trips.
create or replace function touch_conversation()
returns trigger as $$
begin
  update conversations
  set
    last_message_at = new.created_at,
    unread_by_admin = case when new.sender = 'visitor' then true else false end
  where id = new.conversation_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists messages_touch_conversation on messages;
create trigger messages_touch_conversation
  after insert on messages
  for each row execute function touch_conversation();

-- Manual step (Supabase dashboard): Database > Replication > enable
-- Realtime for the `messages` table so live inserts push to subscribers.
