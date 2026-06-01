/**
 * Dynamic XML sitemap for crawlers: home + all review URLs with lastmod.
 * Linked from static/robots.txt; not loaded on normal page views.
 */
import Post from '$lib/server/models/Post';
import type { RequestHandler } from './$types';

function formatLastmod(date: Date): string {
	return date.toISOString().split('T')[0];
}

function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin;
	const posts = await Post.find().sort({ dateCreated: -1 });

	const urls = [
		`<url><loc>${escapeXml(origin)}/</loc></url>`,
		...posts.map(
			(post) =>
				`<url><loc>${escapeXml(`${origin}/posts/${post.path}`)}</loc><lastmod>${formatLastmod(post.dateCreated)}</lastmod></url>`
		)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
