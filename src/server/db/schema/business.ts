import { bigint, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { subscription } from "./subscription";
import { createId } from "./create-id";

export const business = pgTable("business", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => createId('bus')),
    name: text("name").notNull(),
    businessLogo: text("business_logo"),
    businessEmail: text("business_email").notNull(),
    address: text("address").notNull(),
    city: text("city").notNull(),
    postCode: text("post_code").notNull(),
    state: text("state").notNull(),
    country: text("country").notNull(),
    currentSubscriptionId: bigint("subscription_id", { mode: "number" }).references(() => subscription.id),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => {
    return {
        businessIdKey: unique("business_id_key").on(table.id),
    }
});