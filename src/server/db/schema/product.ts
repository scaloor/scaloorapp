import { integer, pgTable,timestamp, text, pgEnum } from "drizzle-orm/pg-core";
import { business } from "./business";
import { scaloorId } from "./defaults";

export const billingType = pgEnum("billing_type", ["one_time", "recurring"]);

export const product = pgTable("product", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('prod')),
    name: text("name").notNull(),
    defaultPrice: integer("default_price").notNull(),
    image: text("image"),
    businessId: text("business_id")
        .references(() => business.id)
        .notNull(),
    stripeProductId: text("stripe_product_id"),
    billingType: billingType("billing_type"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export type InsertProduct = typeof product.$inferInsert;
export type SelectProduct = typeof product.$inferSelect;
