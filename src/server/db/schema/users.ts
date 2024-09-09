import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { scaloorId } from "./defaults";
import { business } from "./business";

export const users = pgTable("user", {
    id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => scaloorId('user')),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    mobile: text("mobile"),
    image: text("image"),
    businessId: text("business_id").references(() => business.id),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),

}, (table) => {
    return {
        userIdKey: unique("user_id_key").on(table.id),
    }
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;