-- Hala self-serve clinics, billing, and Tap gateway settings.
create table if not exists clinics (
  id text primary key,
  user_id text not null,
  slug text not null unique,
  referral_code text not null unique,
  referred_by text,
  plan text not null default 'clinic',
  status text not null default 'trialing',
  trial_ends_at timestamptz not null,
  period_ends_at timestamptz,
  tap_charge_id text,
  tap_customer_id text,
  directory_listed boolean not null default true,
  hide_powered_by boolean not null default false,
  state jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists clinics_user_id_idx on clinics (user_id);
create index if not exists clinics_slug_idx on clinics (slug);

create table if not exists platform_settings (
  id text primary key,
  tap_secret_key text,
  tap_public_key text,
  tap_currency text not null default 'USD',
  updated_at timestamptz not null default now()
);

create table if not exists referral_awards (
  id text primary key,
  referrer_clinic_id text not null,
  referred_clinic_id text not null,
  awarded_at timestamptz not null default now()
);
create unique index if not exists referral_awards_pair_idx on referral_awards (referrer_clinic_id, referred_clinic_id);
