import { getSession } from '$lib/server/session';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.session = getSession(event.cookies);

	const response = await resolve(event);
	return response;
};
