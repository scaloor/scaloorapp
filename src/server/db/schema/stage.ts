import { bigint, json, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { funnel } from "./funnel";
import { scaloorId } from "./defaults";

export const stage = pgTable("stage", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('stage')),
    funnelId: text("funnel_id").notNull().references(() => funnel.id),
    name: text("name").notNull(),
    pathName: text("path_name").notNull(),
    content: json("content"),
    order: bigint("order", { mode: "number" }).notNull(),
    previewImage: text("preview_image"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
    (table) => {
        return {
            stageIdKey: unique("stage_id_key").on(table.id),
        }
    });

export type InsertStage = typeof stage.$inferInsert;
export type SelectStage = typeof stage.$inferSelect;