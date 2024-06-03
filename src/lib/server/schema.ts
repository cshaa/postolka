import { pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users_table', {
	id: serial('id').primaryKey(),
	equipLogin: text('equip_login').notNull().unique()
});

export const logSeverity = pgEnum('log_severity', ['info', 'warning', 'error', 'critical']);
export type LogSeverity = (typeof logSeverity.enumValues)[number];

export const logsTable = pgTable('logs', {
	id: serial('id').primaryKey(),
	severity: logSeverity('severity').notNull(),
	message: text('message').notNull()
});
