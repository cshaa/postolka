import { clearSession, getSession } from '$lib/server/session';
import { redirect } from '@sveltejs/kit';
import { equipLogOut } from '$lib/server/equip';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ cookies }) => {
	const session = getSession(cookies);
	if (session) {
		equipLogOut(session.equipToken);
	}

	clearSession(cookies);
	throw redirect(303, '/');
};
