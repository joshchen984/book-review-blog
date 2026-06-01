/** Strip markdown to plain text for meta descriptions and JSON-LD (not for page rendering). */
export function plainExcerpt(markdown: string, maxLen = 155): string {
	let text = markdown
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/`[^`]*`/g, ' ')
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/(\*\*|__)(.*?)\1/g, '$2')
		.replace(/(\*|_)(.*?)\1/g, '$2')
		.replace(/~~(.*?)~~/g, '$1')
		.replace(/^>\s+/gm, '')
		.replace(/^[-*+]\s+/gm, '')
		.replace(/^\d+\.\s+/gm, '')
		.replace(/\n+/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

	if (text.length <= maxLen) return text;
	return text.slice(0, maxLen).trimEnd() + '…';
}

export type ReviewJsonLdInput = {
	bookTitle: string;
	bookAuthor: string;
	coverUrl: string;
	rating: number;
	dateCreated: Date;
	reviewBody: string;
	authorName?: string;
};

/** Schema.org Review JSON-LD for search rich results (book, rating, review body). */
export function reviewJsonLd(input: ReviewJsonLdInput): Record<string, unknown> {
	const authorName = input.authorName ?? 'Josh';
	const datePublished =
		input.dateCreated instanceof Date
			? input.dateCreated.toISOString()
			: new Date(input.dateCreated).toISOString();

	return {
		'@context': 'https://schema.org',
		'@type': 'Review',
		itemReviewed: {
			'@type': 'Book',
			name: input.bookTitle,
			author: { '@type': 'Person', name: input.bookAuthor },
			image: input.coverUrl
		},
		reviewRating: {
			'@type': 'Rating',
			ratingValue: input.rating,
			bestRating: 5
		},
		author: { '@type': 'Person', name: authorName },
		datePublished,
		reviewBody: input.reviewBody
	};
}

/** Schema.org WebSite JSON-LD; SearchAction enables Google sitelinks search box. */
export function websiteJsonLd(origin: string, siteName: string): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteName,
		url: origin,
		potentialAction: {
			'@type': 'SearchAction',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: `${origin}/?q={search_term_string}`
			},
			'query-input': 'required name=search_term_string'
		}
	};
}
