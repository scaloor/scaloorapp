import { bigint, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createId } from "./create-id";
import { business } from "./business";

export const users = pgTable("user", {
    id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => createId('use')),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    mobile: text("mobile"),
    businessId: bigint("business_id", { mode: "number" }).references(() => business.id),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),

}, (table) => {
    return {
        userIdKey: unique("user_id_key").on(table.id),
    }
});