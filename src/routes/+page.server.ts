import type { PageServerLoad } from './$types';
import Post from '$lib/server/models/Post';

export const load = (async ({ url }) => {
	let query = '';
	let originalQuery = '';
	if (url.searchParams.has('q')) {
		query = url.searchParams.get('q')!.toLowerCase();
		originalQuery = url.searchParams.get('q')!;
	}
	const posts = await Post.find();
	const filteredPosts = posts.filter(
		(post) =>
			post.book.title.toLowerCase().includes(query) ||
			post.book.author.toLowerCase().includes(query)
	);
	return {
		posts: filteredPosts.map((post) => ({
			bookTitle: post.book.title,
			author: post.book.author,
			path: post.path,
			dateCreated: post.dateCreated
		})).sort((a,b) => b.dateCreated.getTime() - a.dateCreated.getTime()),
		query: originalQuery
	};
}) satisfies PageServerLoad;
