-- Tap hosted checkout: every attempt is an order, plus webhook audit.
alter table platform_settings add column if not exists tap_webhook_secret text;

create table if not exists orders (
  id text primary key,
  user_id text not null,
  clinic_id text,
  tap_charge_id text unique,
  reference_order text,
  reference_transaction text,
  plan text not null,
  product text not null default 'Hala',
  amount numeric not null,
  currency text not null,
  status text not null default 'initiated',
  customer_name text,
  customer_email text,
  customer_phone text,
  failure_message text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orders_user_id_idx on orders (user_id);
create index if not exists orders_tap_charge_idx on orders (tap_charge_id);

create table if not exists processed_webhook_events (
  event_key text primary key,
  created_at timestamptz not null default now()
);

create table if not exists webhook_events (
  id text primary key,
  charge_id text,
  result text not null,
  created_at timestamptz not null default now()
);
