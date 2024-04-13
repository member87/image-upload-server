import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js';

import { loadEnvConfig } from '@next/env';
import { cwd } from 'node:process';

loadEnvConfig(cwd());

console.log(process.env.DATABASE_URL)
const sql = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(sql);
(async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
  await sql.end()
})()
