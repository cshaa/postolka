import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { setSession } from '$lib/server/session';
import { ensureUserExists } from '$lib/server/db';
import { equipLogIn } from '$lib/server/equip';

export const actions = {
	default: async ({ request, cookies }) => {
		const { username, password } = Object.fromEntries(
			(await request.formData()).entries()
		) as Record<string, string>;

		try {
			const equipToken = await equipLogIn(username, password);
			const userId = await ensureUserExists(username);
			setSession(cookies, { username, userId, equipToken });
		} catch (e: any) {
			return { error: e.message, username };
		}

		throw redirect(303, '/');
	}
} satisfies Actions;
