import { pgTable, pgEnum, bigint, text, timestamp, foreignKey, unique, boolean, json } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const oneTimeTokenType = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])


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

export const user = pgTable("user", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	id: bigint("id", { mode: "number" }).primaryKey().notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	email: text("email").notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	businessId: bigint("business_id", { mode: "number" }).references(() => business.id),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});