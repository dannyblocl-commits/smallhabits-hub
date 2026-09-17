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
      create index if not exists food_user_at on food_entries(user_id, at desc);
      create index if not exists progress_user_at on progress_entries(user_id, at desc);
    `).then(() => undefined);
  }
  return global.__shSchema;
}
