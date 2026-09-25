import { Pool } from "pg";

declare global { var __shPool: Pool | undefined; var __shSchema: Promise<void> | undefined; }

export function db() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL no configurada");
  if (!global.__shPool) global.__shPool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }, max: 3 });
  return global.__shPool;
}

export function ensureSchema() {
  if (!global.__shSchema) {
    global.__shSchema = db().query(`
      create extension if not exists pgcrypto;
      create table if not exists users (
        id uuid primary key default gen_random_uuid(),
        email text unique not null,
        password_hash text not null,
        name text not null,
        goal text default 'Salud integral',
        weight numeric, height numeric,
        plan text not null default 'free',
        created_at timestamptz default now()
      );
      create table if not exists food_entries (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) on delete cascade,
        name text not null, kcal int not null,
        protein int default 0, carbs int default 0, fat int default 0,
        photo text default '◐',
        at timestamptz default now()
      );
      create table if not exists progress_entries (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) on delete cascade,
        weight numeric, mood int, energy int, note text,
        at timestamptz default now()
      );
      create table if not exists workouts_done (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) on delete cascade,
        routine_id text not null,
        at timestamptz default now()
      );
      alter table workouts_done add column if not exists minutes int;
      alter table workouts_done add column if not exists kcal int;
      create table if not exists photos (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) on delete cascade,
        url text not null, pathname text not null,
        kind text not null default 'progress',
        weight numeric, note text,
        at timestamptz default now()
      );
      create index if not exists photos_user_at on photos(user_id, at desc);
      create table if not exists routines (
        id text primary key,
        type text not null default 'funcional',
        difficulty text not null default 'beginner',
        duration_minutes int not null default 20,
        free boolean not null default false,
        published boolean not null default true,
        i18n jsonb not null default '{}',
        exercises jsonb not null default '[]',
        sort int not null default 100,
        updated_by uuid references users(id), updated_at timestamptz default now()
      );
      create table if not exists menus (
        id text primary key,
        goal text not null default 'Salud integral',
        kcal int not null default 1800,
        macros text,
        free boolean not null default false,
        published boolean not null default true,
        i18n jsonb not null default '{}',
        meals jsonb not null default '[]',
        recipes jsonb not null default '[]',
        brands text,
        sort int not null default 100,
        updated_by uuid references users(id), updated_at timestamptz default now()
      );
      create table if not exists member_notes (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) on delete cascade,
        coach_id uuid references users(id),
        scope text not null,
        body text not null,
        at timestamptz default now()
      );
      create index if not exists member_notes_user on member_notes(user_id, at desc);
      create table if not exists member_overrides (
        user_id uuid references users(id) on delete cascade,
        scope text not null,
        data jsonb not null default '{}',
        coach_id uuid references users(id), at timestamptz default now(),
        primary key (user_id, scope)
      );
      create table if not exists routines (
        id text primary key default gen_random_uuid()::text,
        name text not null, description text default '', type text not null default 'funcional',
        duration_minutes int not null default 20, difficulty text not null default 'beginner',
        exercises jsonb not null default '[]', free boolean not null default false, sort int not null default 100,
        updated_by uuid references users(id), updated_at timestamptz default now()
      );
      create table if not exists menus (
        id text primary key default gen_random_uuid()::text,
        name text not null, kcal int not null default 1800, macros text default '', goal text default 'Salud integral',
        meals jsonb not null default '[]', recipes jsonb not null default '[]', brands text default '',
        free boolean not null default false, sort int not null default 100,
        updated_by uuid references users(id), updated_at timestamptz default now()
      );
      alter table routines add column if not exists name text not null default '';
      alter table routines add column if not exists description text default '';
      alter table routines add column if not exists type text not null default 'funcional';
      alter table routines add column if not exists duration_minutes int not null default 20;
      alter table routines add column if not exists difficulty text not null default 'beginner';
      alter table routines add column if not exists exercises jsonb not null default '[]';
      alter table routines add column if not exists free boolean not null default false;
      alter table routines add column if not exists sort int not null default 100;
      alter table routines add column if not exists updated_at timestamptz default now();
      alter table menus add column if not exists name text not null default '';
      alter table menus add column if not exists kcal int not null default 1800;
      alter table menus add column if not exists macros text default '';
      alter table menus add column if not exists goal text default 'Salud integral';
      alter table menus add column if not exists meals jsonb not null default '[]';
      alter table menus add column if not exists recipes jsonb not null default '[]';
      alter table menus add column if not exists brands text default '';
      alter table menus add column if not exists free boolean not null default false;
      alter table menus add column if not exists sort int not null default 100;
      alter table menus add column if not exists updated_at timestamptz default now();
      alter table routines add column if not exists i18n jsonb not null default '{}';
      alter table menus add column if not exists i18n jsonb not null default '{}';
      create table if not exists recommendations (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) on delete cascade,
        coach_id uuid references users(id) on delete set null,
        category text not null default 'general',
        body text not null,
        at timestamptz default now()
      );
      create index if not exists recs_user_at on recommendations(user_id, at desc);
      create table if not exists recipes (
        id text primary key default gen_random_uuid()::text,
        category text not null default 'desayunos',
        name text not null, ingredients jsonb not null default '[]', steps text not null default '', tips text default '',
        tags jsonb not null default '[]', i18n jsonb not null default '{}',
        free boolean not null default false, sort int not null default 100,
        updated_by uuid references users(id), updated_at timestamptz default now()
      );
      create index if not exists recipes_cat on recipes(category, sort);
      create table if not exists lessons (
        id text primary key default gen_random_uuid()::text,
        title text not null, body text not null default '', i18n jsonb not null default '{}',
        free boolean not null default true, sort int not null default 100,
        updated_by uuid references users(id), updated_at timestamptz default now()
      );
      create table if not exists content_media (
        key text primary key,
        pathname text not null, content_type text not null, size int,
        uploaded_by uuid references users(id), at timestamptz default now()
      );
      create table if not exists user_menus (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) on delete cascade,
        name text not null,
        items jsonb not null default '[]',
        kcal int not null default 0,
        at timestamptz default now()
      );
      alter table users add column if not exists role text not null default 'member';
      alter table users add column if not exists coach_id uuid references users(id) on delete set null;
      alter table users add column if not exists google_sub text unique;
      alter table users add column if not exists avatar_url text;
      alter table users alter column password_hash drop not null;
      alter table users add column if not exists bio text;
      alter table users add column if not exists specialties text;
      create table if not exists messages (
        id uuid primary key default gen_random_uuid(),
        from_user uuid references users(id) on delete cascade,
        to_user uuid references users(id) on delete cascade,
        body text not null,
        at timestamptz default now(),
        read_at timestamptz
      );
      create index if not exists messages_pair on messages(to_user, from_user, at desc);
      create table if not exists assignments (
        user_id uuid primary key references users(id) on delete cascade,
        routine_id text, menu_id text, note text,
        by_coach uuid references users(id),
        at timestamptz default now()
      );
      create table if not exists wearable_connections (
        user_id uuid references users(id) on delete cascade,
        provider text not null,
        access_token text not null, refresh_token text, expires_at timestamptz,
        scope text, connected_at timestamptz default now(), last_sync timestamptz,
        primary key (user_id, provider)
      );
      create table if not exists wearable_daily (
        user_id uuid references users(id) on delete cascade,
        day date not null, provider text not null,
        steps int, resting_hr int, active_kcal int, sleep_min int, workouts int, workout_min int,
        updated_at timestamptz default now(),
        primary key (user_id, day, provider)
      );
      create table if not exists ai_usage (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) on delete cascade,
        kind text not null,
        tokens_in int default 0, tokens_out int default 0,
        at timestamptz default now()
      );
      create index if not exists ai_usage_user_at on ai_usage(user_id, at desc);
      create index if not exists food_user_at on food_entries(user_id, at desc);
      create index if not exists progress_user_at on progress_entries(user_id, at desc);

      alter table users add column if not exists stripe_customer_id text unique;
      alter table users add column if not exists plan_level text not null default 'basico';
      alter table users add column if not exists subscription_id text;
      alter table users add column if not exists trial_end timestamptz;
      alter table users add column if not exists reto_start timestamptz;
      alter table users add column if not exists reto_track text;
      create table if not exists reto_leads (
        id uuid primary key default gen_random_uuid(),
        name text not null,
        email text not null,
        phone text not null,
        address1 text not null,
        address2 text,
        city text not null,
        state text not null,
        zip text not null,
        country text not null default 'US',
        track text not null default 'mujer',
        goal text not null,
        level text not null,
        health text,
        notes text,
        lang text not null default 'es',
        status text not null default 'nuevo',
        created_at timestamptz default now()
      );
      create index if not exists reto_leads_at on reto_leads(created_at desc);

      create table if not exists payments (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) on delete cascade,
        stripe_payment_id text unique,
        amount numeric not null,
        currency text default 'USD',
        plan_level text not null,
        status text not null default 'pending',
        created_at timestamptz default now(),
        updated_at timestamptz default now()
      );
      create index if not exists payments_user_at on payments(user_id, created_at desc);

      create table if not exists plan_limits (
        id uuid primary key default gen_random_uuid(),
        plan_level text not null unique,
        max_routines int not null,
        max_recipes int not null,
        max_messages int,
        max_1on1_sessions int,
        features jsonb default '{}',
        created_at timestamptz default now()
      );

      create table if not exists notifications (
        id uuid primary key default gen_random_uuid(),
        user_id uuid references users(id) on delete cascade,
        title text not null,
        body text not null,
        read_at timestamptz,
        created_at timestamptz default now()
      );
      create index if not exists notifications_user_at on notifications(user_id, created_at desc);
    `).then(() => undefined);
  }
  return global.__shSchema;
}
