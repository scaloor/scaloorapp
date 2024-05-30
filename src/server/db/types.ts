import { business, users } from "./schema";

export type User = typeof users.$inferInsert
export type Business = typeof business.$inferInsert

export type Stage = {}