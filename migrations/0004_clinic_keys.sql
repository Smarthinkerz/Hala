-- Per-clinic AI key (encrypted) and keep directory_listed as the public listing flag.
alter table clinics add column if not exists xai_key_enc text;
alter table clinics add column if not exists xai_key_hint text;
