import { pgTable, serial, text, integer, timestamp, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	role: text('role').default('user').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const userRelations = relations(user, ({ many }) => ({
	activities: many(activity)
}));

export const company = pgTable('company', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
	industry: text('industry'),
	website: text('website'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const companyRelations = relations(company, ({ many }) => ({
	contacts: many(contact),
	deals: many(deal)
}));

export const contact = pgTable('contact', {
	id: serial('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull(),
	phone: text('phone'),
	companyId: integer('company_id').references(() => company.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const contactRelations = relations(contact, ({ one, many }) => ({
	company: one(company, {
		fields: [contact.companyId],
		references: [company.id]
	}),
	deals: many(deal),
	activities: many(activity)
}));

export const deal = pgTable('deal', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	value: integer('value').notNull(),
	stage: text('stage').notNull(),
	companyId: integer('company_id').references(() => company.id),
	contactId: integer('contact_id').references(() => contact.id),
	expectedCloseDate: timestamp('expected_close_date'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const dealRelations = relations(deal, ({ one, many }) => ({
	company: one(company, {
		fields: [deal.companyId],
		references: [company.id]
	}),
	contact: one(contact, {
		fields: [deal.contactId],
		references: [contact.id]
	}),
	activities: many(activity)
}));

export const activity = pgTable('activity', {
	id: serial('id').primaryKey(),
	type: text('type').notNull(), // e.g., 'call', 'email', 'meeting'
	subject: text('subject').notNull(),
	description: text('description'),
	userId: integer('user_id').references(() => user.id),
	contactId: integer('contact_id').references(() => contact.id),
	dealId: integer('deal_id').references(() => deal.id),
	dueDate: timestamp('due_date'),
	completed: boolean('completed').default(false).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const activityRelations = relations(activity, ({ one }) => ({
	user: one(user, {
		fields: [activity.userId],
		references: [user.id]
	}),
	contact: one(contact, {
		fields: [activity.contactId],
		references: [contact.id]
	}),
	deal: one(deal, {
		fields: [activity.dealId],
		references: [deal.id]
	})
}));
