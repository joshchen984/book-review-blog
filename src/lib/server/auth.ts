import { ADMIN_TOKEN } from '$env/static/private';
import type { Cookies, RequestEvent } from '@sveltejs/kit';

export const isAuthenticated = (event: RequestEvent) => {
	const token = event.cookies.get('authentication');
	if (!token || token !== ADMIN_TOKEN) {
		return false;
	}
	return true;
};

export const logout = (cookies: Cookies) => {
	cookies.delete('authentication', { path: '/' });
};
