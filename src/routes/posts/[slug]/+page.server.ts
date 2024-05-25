import type { PageServerLoad } from './$types';
import Post, { postToJson } from '$lib/server/models/Post';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const post = await Post.findOne({ path: params.slug });
	if (!post) {
		return error(404);
	}
	return postToJson(post);
}) satisfies PageServerLoad;
