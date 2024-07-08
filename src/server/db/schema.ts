import { bigint, bigserial, boolean, json, pgEnum, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";


export const users = pgTable("user", {
	id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
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

export const business = pgTable("business", {
	id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
	name: text("name").notNull(),
	businessLogo: text("business_logo"),
	businessEmail: text("business_email").notNull(),
	address: text("address").notNull(),
	city: text("city").notNull(),
	postCode: text("post_code").notNull(),
	state: text("state").notNull(),
	country: text("country").notNull(),
	currentSubscriptionId: bigint("subscription_id", { mode: "number" }).references(() => subscription.id),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => {
	return {
		businessIdKey: unique("business_id_key").on(table.id),
	}
});

export const planEnum = pgEnum("plan_enum", ['funnels'])

export const subscription = pgTable("subscription", {
	id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
	businessId: bigint("business_id", { mode: "number" }).notNull(),
	plan: planEnum("plan").notNull(),
	price: text("price").notNull(),
	active: boolean("active").default(false).notNull(),
	priceId: text("price_id").notNull(),
	customerId: text("customer_id").notNull(),
	currentPeriodEndDate: timestamp("current_period_end_date", { withTimezone: true, mode: 'string' }).notNull(),
	subscriptionId: text("subscription_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		subscriptionIdKey: unique("subscription_id_key").on(table.id),
	}
});

export const funnel = pgTable("funnel", {
	id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
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
	id: bigserial("id", { mode: "number" }).primaryKey().notNull(),
	funnelId: bigint("funnel_id", { mode: "number" }).notNull().references(() => funnel.id),
	name: text("name").notNull(),
	pathName: text("path_name").notNull(),
	content: json("content").notNull(),
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