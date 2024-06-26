import { bigint, boolean, integer, json, pgTable, primaryKey, serial, text, timestamp, unique } from "drizzle-orm/pg-core";


export const users = pgTable("user", {
	id: serial("id").primaryKey().notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	email: text("email").notNull(),
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