import { boolean, pgEnum, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { scaloorId } from "./scaloor-id";

export const planEnum = pgEnum("plan_enum", ['funnels'])

export const subscription = pgTable("subscription", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('sub')),
    businessId: text("business_id").notNull(),
    plan: planEnum("plan").notNull(),
    price: text("price").notNull(),
    active: boolean("active").default(false).notNull(),
    priceId: text("price_id").notNull(),
    customerId: text("customer_id").notNull(),
    currentPeriodEndDate: timestamp("current_period_end_date", { withTimezone: true, mode: 'string' }).notNull(),
    subscriptionId: text("subscription_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
    (table) => {
        return {
            subscriptionIdKey: unique("subscription_id_key").on(table.id),
        }
    });

export type InsertSubscription = typeof subscription.$inferInsert;
export type SelectSubscription = typeof subscription.$inferSelect;