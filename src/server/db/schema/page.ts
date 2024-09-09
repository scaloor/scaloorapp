import { bigint, json, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { funnel } from "./funnel";
import { scaloorId } from "./defaults";

export const page = pgTable("page", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('page')),
    funnelId: text("funnel_id").notNull().references(() => funnel.id),
    name: text("name").notNull(),
    pathName: text("path_name").notNull(),
    content: json("content"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
    (table) => {
        return {
            pageIdKey: unique("page_id_key").on(table.id),
        }
    });

export type InsertPage = typeof page.$inferInsert;
export type SelectPage = typeof page.$inferSelect;