import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { scaloorId } from "./defaults";
import { business } from "./business";

export const domain = pgTable("domain", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('domain')),
    businessId: text("business_id").notNull().references(() => business.id),
    domain: text("domain").unique().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export type InsertDomain = typeof domain.$inferInsert;
export type SelectDomain = typeof domain.$inferSelect;
