import { ADMIN_PASSWORD, ADMIN_TOKEN } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');
		const secondsInMonth = 60 * 60 * 24 * 7 * 4;
		if (password === ADMIN_PASSWORD) {
			cookies.set('authentication', ADMIN_TOKEN, { path: '/', maxAge: secondsInMonth });
			throw redirect(303, '/admin');
		}
		return fail(401, {
			error: 'Incorrect password'
		});
	}
};
