import { bigint, boolean, integer, json, pgTable, primaryKey, text, timestamp, unique } from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";


export const users = pgTable("user", {
	id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	password: text("password"),
	businessId: bigint("business_id", { mode: "number" }).references(() => business.id),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const business = pgTable("business", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	name: text("name").notNull(),
	businessLogo: text("business_logo"),
	businessEmail: text("business_email").notNull(),
	address: text("address"),
	city: text("city"),
	postCode: text("post_code"),
	state: text("state"),
	country: text("country"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const funnel = pgTable("funnel", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	businessId: bigint("business_id", { mode: "number" }).notNull().references(() => business.id),
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

export const stage = pgTable("stage", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	funnelId: bigint("funnel_id", { mode: "number" }).notNull().references(() => funnel.id),
	name: text("name").notNull(),
	pathName: text("path_name").notNull(),
	content: json("content").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	order: bigint("order", { mode: "number" }).notNull(),
	previewImage: text("preview_image").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
	(table) => {
		return {
			stageIdKey: unique("stage_id_key").on(table.id),
		}
	});

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
);

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
);

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
);