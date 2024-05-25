import type { PageServerLoad, Actions } from './$types';
import { GOOGLE_BOOKS_API_KEY } from '$env/static/private';

import Post, { postToJson } from '$lib/server/models/Post';
import Book from '$lib/server/models/Book';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createPost: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title');
		const bookTitle = data.get('book-title');
		const content = data.get('content');
		const rating = data.get('rating');
		const path = data.get('path');
		const bookSummary = data.get('book-summary');

		const res = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${bookTitle}&key=${GOOGLE_BOOKS_API_KEY}`
		);
		const bookDetails = (await res.json()).items[0].volumeInfo;
		const coverResponse = await fetch(
			`http://bookcover.longitood.com/bookcover?book_title=${bookDetails.title}&author_name=${bookDetails.authors[0]}`
		);
		const { url } = await coverResponse.json();

		const book = new Book({
			title: bookDetails.title,
			description: bookSummary,
			author: bookDetails.authors[0],
			publishDate: bookDetails.publishedDate,
			coverUrl: url,
			genres: ['test']
		});

		await book.save();

		const post = await Post.create({
			title,
			content,
			rating,
			path,
			book
		});
		return postToJson(post);
	}
};
