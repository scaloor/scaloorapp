import { bigint, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { subscription } from "./subscription";
import { scaloorId } from "./scaloor-id";

export const business = pgTable("business", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('bus')),
    name: text("name").notNull(),
    businessLogo: text("business_logo"),
    businessEmail: text("business_email").notNull(),
    country: text("country"),
    currentSubscriptionId: text("subscription_id").references(() => subscription.id),
    stripeAccountId: text("stripe_account_id"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => {
    return {
        businessIdKey: unique("business_id_key").on(table.id),
    }
});

export type InsertBusiness = typeof business.$inferInsert;
export type SelectBusiness = typeof business.$inferSelect;