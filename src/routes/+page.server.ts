import type { PageServerLoad } from './$types';
import Post from '$lib/server/models/Post';

export const load = (async () => {
	const posts = await Post.find();

	return {
		posts: posts.map((post) => ({
			bookTitle: post.book.title,
			author: post.book.author,
			path: post.path,
			dateCreated: post.dateCreated
		}))
	};
}) satisfies PageServerLoad;
