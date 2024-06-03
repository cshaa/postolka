import { createSigner, createVerifier } from 'fast-jwt';
import { config } from 'dotenv';
import type { Cookies } from '@sveltejs/kit';
import type { UserId } from './db';
config({ path: '.env' });

const secret = process.env.JWT_SECRET!;
const signer = createSigner({ key: secret, algorithm: 'HS512' });
const verifier = createVerifier({ key: secret, algorithms: ['HS512'] });

export interface Session {
	username: string;
	userId: UserId;
}

export function setSession(cookies: Cookies, session: Session) {
	cookies.set('session', signer(session), { path: '/' });
}

export function clearSession(cookies: Cookies) {
	cookies.delete('session', { path: '/' });
}

export function getSession(cookies: Cookies): Session | undefined {
	const sessionCookie = cookies.get('session');
	if (!sessionCookie) return;

	try {
		return verifier(sessionCookie);
	} catch {}
}
