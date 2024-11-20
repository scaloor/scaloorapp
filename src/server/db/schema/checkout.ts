import { integer, pgTable,timestamp, text, pgEnum, boolean } from "drizzle-orm/pg-core";
import { business } from "./business";
import { billingType } from "./product";
import { scaloorId } from "./defaults";


export const checkout = pgTable("checkout", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('chk')),
    businessId: text("business_id")
        .references(() => business.id)
        .notNull(),
    productName: text("product_name").notNull(),
    productDescription: text("product_description"),
    productPrice: integer("product_price").notNull(),
    billingType: billingType("billing_type").notNull(),
    thumbnail: text("thumbnail"),
    productFile: text("product_file").notNull(),
    stripeProductId: text("stripe_product_id"),
    customerName: boolean("customer_name"),
    customerEmail: boolean("customer_email"),    
    customerPhone: boolean("customer_phone"),
    customerAddress: boolean("customer_address"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export type InsertCheckout = typeof checkout.$inferInsert;
export type SelectCheckout = typeof checkout.$inferSelect;

