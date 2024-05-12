import { integer, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";


export const users = pgTable("user", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	password: text("password"),
})

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
	})
)

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		email: text("email").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	})
)

export const passwordResetTokens = pgTable(
	"passwordResetToken",
	{
		identifier: text("identifier").notNull(),
		email: text("email").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(pt) => ({
		compoundKey: primaryKey({ columns: [pt.identifier, pt.token] }),
	})
)