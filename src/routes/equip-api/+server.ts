import { equipLogIn } from '$lib/server/equip';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const result = await equipLogIn(url.searchParams.get('user')!, url.searchParams.get('pass')!);
	return new Response(result);
};
