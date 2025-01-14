import { boolean, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { subscription } from "./subscription";
import { scaloorId } from "./defaults";

export const organization = pgTable("organization", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('org')),
    name: text("name").notNull(),
    orgLogo: text("org_logo"),
    orgEmail: text("org_email").notNull(),
    country: text("country").notNull(),
    currentSubscriptionId: text("subscription_id").references(() => subscription.id),
    stripeAccountId: text("stripe_account_id"),
    paymentsEnabled: boolean("payments_enabled").default(false),
    defaultCurrency: text("default_currency"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => {
    return {
        orgIdKey: unique("org_id_key").on(table.id),
    }
});

export type InsertOrganization = typeof organization.$inferInsert;
export type SelectOrganization = typeof organization.$inferSelect;