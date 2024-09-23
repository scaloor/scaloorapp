import { boolean, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { business } from "./business";
import { scaloorId } from "./defaults";

export const funnel = pgTable("funnel", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('fun')),
    businessId: text("business_id").notNull().references(() => business.id),
    name: text("name").notNull(),
    pathName: text("path_name").notNull(),
    published: boolean("published").default(false).notNull(),
    favicon: text("favicon"),
    checkoutProduct: text("checkout_product"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
    (table) => {
        return {
            funnelIdKey: unique("funnel_id_key").on(table.id),
        }
    });

export type InsertFunnel = typeof funnel.$inferInsert;
export type SelectFunnel = typeof funnel.$inferSelect;