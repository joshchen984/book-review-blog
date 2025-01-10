import Subscriber from '$lib/server/models/Subscriber';
import { isValidEmail } from '$lib/validation';
import { json, type RequestHandler } from '@sveltejs/kit';
import { MongoServerError } from 'mongodb';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json();
	if (!isValidEmail(email)) {
		return json({ message: 'Not a valid email address' }, { status: 400 });
	}
	const subscriber = new Subscriber({ email });
	try {
		await subscriber.save();
		return json({}, { status: 201 });
	} catch (e) {
		if (e instanceof MongoServerError) {
			if (e.code === 11000) {
				return json({ message: 'Email already exists' }, { status: 400 });
			}
			return json({}, { status: 500 });
		}
	}
};
