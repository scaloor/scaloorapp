import { integer, pgTable,timestamp, text, pgEnum, boolean } from "drizzle-orm/pg-core";
import { organization } from "./organization";
import { scaloorId } from "./defaults";

export const billingType = pgEnum("billing_type", ["one_time", "recurring"]);

export const checkout = pgTable("checkout", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('chk')),
    organizationId: text("organization_id")
        .references(() => organization.id)
        .notNull(),
    productName: text("product_name").notNull(),
    productDescription: text("product_description"),
    productPrice: integer("product_price").notNull(),
    billingType: billingType("billing_type").notNull(),
    thumbnail: text("thumbnail"),
    productFile: text("product_file").notNull(),
    stripeProductId: text("stripe_product_id"),
    customerName: boolean("customer_name").notNull().default(false),
    customerEmail: boolean("customer_email").notNull().default(true),    
    customerPhone: boolean("customer_phone").notNull().default(false),
    customerAddress: boolean("customer_address").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export type InsertCheckout = typeof checkout.$inferInsert;
export type SelectCheckout = typeof checkout.$inferSelect;

