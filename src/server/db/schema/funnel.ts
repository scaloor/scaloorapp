import { bigint, boolean, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { business } from "./business";
import { scaloorId } from "./scaloor-id";

export const funnel = pgTable("funnel", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('fun')),
    businessId: text("business_id").notNull().references(() => business.id),
    name: text("name").notNull(),
    description: text("description"),
    published: boolean("published").default(false).notNull(),
    subDomainName: text("sub_domain_name"),
    favicon: text("favicon"),
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