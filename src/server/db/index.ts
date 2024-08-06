import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/server/db/schema";
import postgres from "postgres";

export const db = drizzle(postgres(process.env.DATABASE_URL!), { schema });