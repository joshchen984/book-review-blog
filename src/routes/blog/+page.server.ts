import type { PageServerLoad } from './$types';
import Post from '$lib/server/models/Post';

export const load = (async () => {
	const posts = await Post.find();

	return { posts: posts.map((post) => ({ title: post.title, path: post.path })) };
}) satisfies PageServerLoad;
