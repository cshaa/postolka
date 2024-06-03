import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { usersTable } from './schema';
import { eq } from 'drizzle-orm';

import { config } from 'dotenv';
config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

declare const USER_ID: unique symbol;
export type UserId = number & { [USER_ID]: true };

export async function ensureUserExists(username: string): Promise<UserId> {
	const user = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.equipLogin, username))
		.limit(1);

	const exists = user.length > 0;
	if (exists) {
		return user[0].id as UserId;
	}

	await db.insert(usersTable).values({ equipLogin: username });
	return ensureUserExists(username);
}
