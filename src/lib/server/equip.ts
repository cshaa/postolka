import { CookieJar } from '$lib/utils/cookies';
import { parseStream } from '$lib/utils/html';
import { log } from './db';

const URL_BASE = 'https://e-quip.cz/';
const URL_PART_LOGIN_FORM = 'index.php';
const URL_PART_LOGIN_JWT = 'ajax/ajax_jwt.php?PHP_AUTH_USER=';
const URL_PART_LOGIN_JWT_PASSWORD = '&equip_login_password=';
const URL_PART_LOGIN_JWT_END = '&overovani_opatrovnici=0';
const URL_PART_LOGOUT = 'index.php?equip_logout=1';

export class LoginError extends Error {
	constructor(options?: ErrorOptions) {
		super('Přihlašovací jméno nebo heslo do e-Quipu byly nesprávné.', options);
	}
}

export class AssertionError extends Error {
	constructor(id: string, data: any, options?: ErrorOptions) {
		super('Chyba systému, problém byl nahlášen administrátorovi.', options);
		log('error', `${id}: ${JSON.stringify(data)}`);
	}
}

export async function equipLogIn(username: string, password: string) {
	const loginForm = await fetch(URL_BASE + URL_PART_LOGIN_FORM);
	const cookies = CookieJar.from(loginForm.headers);
	if (!cookies.has('PHPSESSID')) throw new AssertionError('LOGIN_SESSION', cookies.toString());

	const loginUrl =
		URL_BASE +
		URL_PART_LOGIN_JWT +
		username +
		URL_PART_LOGIN_JWT_PASSWORD +
		password +
		URL_PART_LOGIN_JWT_END;

	const loginHeaders = cookies.toRequestHeaders({
		Authorization: `Basic ${btoa(username + ':')}`
	});

	const login = await fetch(loginUrl, { headers: loginHeaders });
	if (login.status === 250) throw new LoginError();
	if (login.status !== 200) {
		throw new AssertionError('LOGIN_STATUS', login.status + ' ' + login.statusText);
	}

	cookies.append(login.headers);
	return cookies.toString();
}

export async function equipLogOut(token: string) {
	const cookies = CookieJar.from(token);
	await fetch(URL_BASE + URL_PART_LOGOUT, { headers: cookies.toRequestHeaders() });
}
