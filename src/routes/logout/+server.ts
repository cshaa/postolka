import { clearSession } from '$lib/server/session';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ cookies }) => {
	clearSession(cookies);
	throw redirect(303, '/');
};
