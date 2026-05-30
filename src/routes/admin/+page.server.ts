import type { Actions } from './$types';
import { GOOGLE_BOOKS_API_KEY } from '$env/static/private';

import Post, { postToJson } from '$lib/server/models/Post';
import Book from '$lib/server/models/Book';
import { logout } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

type VolumeInfo = {
	title: string;
	authors: string[];
	publishedDate?: string;
	industryIdentifiers?: { type: string; identifier: string }[];
};

function isbn(info: VolumeInfo) {
	const ids = info.industryIdentifiers ?? [];
	return (
		ids.find((i) => i.type === 'ISBN_13')?.identifier ??
		ids.find((i) => i.type === 'ISBN_10')?.identifier
	);
}

function normalizeIsbn(isbn: string) {
	return isbn.replace(/[-\s]/g, '');
}

function coverUrl(isbn: string) {
	return `https://covers.openlibrary.org/b/isbn/${normalizeIsbn(isbn)}-L.jpg`;
}

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
			`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle as string)}&key=${GOOGLE_BOOKS_API_KEY}`
		);
		const bookDetails = (await res.json()).items[0].volumeInfo as VolumeInfo;
		const bookIsbn = isbn(bookDetails);
		if (!bookIsbn) {
			return fail(404, { message: 'No ISBN found for that book.' });
		}

		const book = new Book({
			title: bookDetails.title,
			description: bookSummary,
			author: bookDetails.authors[0],
			publishDate: bookDetails.publishedDate,
			coverUrl: coverUrl(bookIsbn),
			genres: []
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
	},
	logout: ({ cookies }) => {
		logout(cookies);
		throw redirect(303, '/');
	}
};
