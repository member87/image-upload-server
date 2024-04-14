import postgres from 'postgres'
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';

const sql = postgres(process.env.DATABASE_URL as string, {
  max: 1,
  idle_timeout: 5,
  max_lifetime: 60,
});
export const db = drizzle(sql, { schema });

