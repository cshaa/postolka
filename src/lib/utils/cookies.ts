export class CookieJar {
	#cookies = new Map<string, string>();

	has(name: string) {
		return this.#cookies.has(name);
	}

	get(name: string) {
		return this.#cookies.get(name);
	}

	set(name: string, value: string) {
		return this.#cookies.set(name, value);
	}

	delete(name: string) {
		this.#cookies.delete(name);
	}

	[Symbol.iterator]() {
		return this.#cookies.entries();
	}

	toString() {
		let str = '';
		for (const [key, value] of this.#cookies) {
			if (str !== '') str += '; ';
			str += `${key}=${value}`;
		}
		return str;
	}

	toRequestHeaders(init?: HeadersInit | undefined): Headers {
		return new Headers({ Cookie: this.toString(), ...init });
	}

	toResponseHeaders(): Headers {
		const headers = new Headers();
		for (const [key, value] of this.#cookies) {
			headers.append('Set-Cookie', `${key}=${value}`);
		}
		return headers;
	}

	static from(cookies: string): CookieJar;
	static from(headers: Headers): CookieJar;
	static from(cookies: Iterable<string>): CookieJar;
	static from(cookies: Iterable<[string, string]>): CookieJar;
	static from(source: string | Headers | Iterable<string | [string, string]>): CookieJar {
		if (typeof source === 'string') {
			source = source.split(/; ?/s);
		}

		if ('getSetCookie' in source) {
			return CookieJar.from(source.getSetCookie());
		}

		const cookieJar = new CookieJar();

		for (let cookie of source) {
			if (typeof cookie === 'string') {
				const [key, value] = cookie.split(/=([^;]*)/s);
				cookie = [key, value];
			}

			cookieJar.#cookies.set(cookie[0], cookie[1]);
		}

		return cookieJar;
	}

	append(cookies: string): CookieJar;
	append(headers: Headers): CookieJar;
	append(cookies: CookieJar): CookieJar;
	append(cookies: Iterable<string>): CookieJar;
	append(cookies: Iterable<[string, string]>): CookieJar;
	append(source: string | CookieJar | Headers | Iterable<string | [string, string]>) {
		if (!(source instanceof CookieJar)) source = CookieJar.from(source as any);

		for (const [key, value] of source) {
			this.#cookies.set(key, value);
		}

		return this;
	}
}
