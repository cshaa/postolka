import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { setSession } from '$lib/server/session';
import { db, ensureUserExists } from '$lib/server/db';

export const actions = {
	default: async ({ request, cookies }) => {
		const { username, password } = Object.fromEntries((await request.formData()).entries());
		if (username !== 'asdf' || password !== 'asdf') {
			return { error: 'Špatné jméno nebo heslo.', username };
		}

		const userId = await ensureUserExists(username);

		setSession(cookies, { username, userId });

		throw redirect(303, '/');
	}
} satisfies Actions;
