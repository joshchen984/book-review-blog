import { dbConnect } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';
import { isAuthenticated } from '$lib/server/auth';

await dbConnect();

export const handle: Handle = ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/admin') && event.url.pathname !== '/admin/login') {
		if (!isAuthenticated(event)) {
			return new Response('Unauthorized', {
				status: 403
			});
		}
	}
	return resolve(event);
};
