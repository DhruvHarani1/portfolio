-- Run this once in the Supabase SQL editor, after schema.sql.
-- Adds a server-side (Postgres trigger) rate limit on visitor messages —
-- enforced at the database level, so it can't be bypassed by calling
-- Supabase directly with the public anon key instead of going through
-- the site's UI.

create or replace function enforce_message_rate_limit()
returns trigger as $$
declare
  recent_count integer;
begin
  if new.sender = 'visitor' then
    select count(*) into recent_count
    from messages
    where conversation_id = new.conversation_id
      and sender = 'visitor'
      and created_at > now() - interval '60 seconds';

    if recent_count >= 10 then
      raise exception 'rate_limited: too many messages, please slow down'
        using errcode = 'P0001';
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists messages_rate_limit on messages;
create trigger messages_rate_limit
  before insert on messages
  for each row execute function enforce_message_rate_limit();
