import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
	id: serial('id').primaryKey(),
	equipLogin: text('equip_login').notNull().unique()
});
