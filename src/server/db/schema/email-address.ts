import { pgEnum, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { scaloorId } from "./defaults";

export const emailCampaignEnum = pgEnum("email_campaign_enum", ['waitlist'])

export const emailAddress = pgTable("email_address", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => scaloorId('email')),
    email: text("email").notNull(),
    capturedAt: timestamp("captured_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
    campaign: emailCampaignEnum("campaign").notNull().default('waitlist'),
}, (table) => {
    return {
        emailAddressKey: unique("email_address_key").on(table.id),
    }
});