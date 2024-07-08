import { business, funnel, stage, subscription, users } from "./schema";

export type User = typeof users.$inferInsert
export type Business = typeof business.$inferInsert
export type Funnel = typeof funnel.$inferInsert
export type Stage = typeof stage.$inferInsert
export type Subscription = typeof subscription.$inferInsert