/** Curated washi spine palette from the redesign demo */
const SPINE_PALETTE: { color: string; text: string }[] = [
	{ color: '#7B4A3A', text: '#f5e0d8' },
	{ color: '#bfc9b6', text: '#1e2e14' },
	{ color: '#4a6741', text: '#d8f0d0' },
	{ color: '#2d3a5c', text: '#c8d8f4' },
	{ color: '#1a1a1a', text: '#e8e0d0' },
	{ color: '#d4a843', text: '#3a2800' },
	{ color: '#8a9db5', text: '#0a1a2e' },
	{ color: '#b05a3a', text: '#fde8de' },
	{ color: '#c8b4d0', text: '#2a0a3a' },
	{ color: '#3d3020', text: '#d4c8a8' },
	{ color: '#3d5c2a', text: '#d0e8b8' },
	{ color: '#5a5a7a', text: '#d8d8f4' }
];

const MIN_WIDTH = 240;
const MAX_WIDTH = 360;
const MIN_HEIGHT = 30;
const MAX_HEIGHT = 46;

const FNV_OFFSET = 2166136261;
const FNV_PRIME = 16777619;

/** Original djb2-style hash for spine color selection */
function paletteHash(input: string): number {
	let hash = 0;
	for (let i = 0; i < input.length; i++) {
		hash = (hash << 5) - hash + input.charCodeAt(i);
		hash |= 0;
	}
	return Math.abs(hash);
}

/** FNV-1a hash for width/height variation */
function dimensionHash(input: string): number {
	let hash = FNV_OFFSET;
	for (let i = 0; i < input.length; i++) {
		hash ^= input.charCodeAt(i);
		hash = Math.imul(hash, FNV_PRIME);
	}
	return hash >>> 0;
}

function spineKey(title: string, author: string): string {
	return `${title}|${author}`.toLowerCase().trim();
}

function resolvePaletteIndex(title: string, author: string, avoidIndex?: number): number {
	const key = spineKey(title, author);
	const base = paletteHash(key) % SPINE_PALETTE.length;
	if (avoidIndex === undefined || base !== avoidIndex) return base;

	const alt = paletteHash(key + ':alt') % (SPINE_PALETTE.length - 1);
	return alt >= avoidIndex ? alt + 1 : alt;
}

export function spineColor(title: string, author: string): string {
	return SPINE_PALETTE[resolvePaletteIndex(title, author)].color;
}

export function spineText(title: string, author: string): string {
	return SPINE_PALETTE[resolvePaletteIndex(title, author)].text;
}

export function spineWidth(title: string, author: string): number {
	const hash = dimensionHash(spineKey(title, author) + ':w');
	const range = MAX_WIDTH - MIN_WIDTH;
	return MIN_WIDTH + (hash % (range + 1));
}

export function spineHeight(title: string, author: string): number {
	const hash = dimensionHash(spineKey(title, author) + ':h');
	const range = MAX_HEIGHT - MIN_HEIGHT;
	return MIN_HEIGHT + (hash % (range + 1));
}

export function spineWobble(index: number): number {
	return index % 3 === 0 ? -1 : index % 3 === 1 ? 0.5 : -0.5;
}

export type BookSpineStyle = {
	color: string;
	text: string;
	width: number;
	height: number;
	wobble: number;
};

export type BookSpineNeighbor = {
	title: string;
	author: string;
};

export type BookSpineInput = {
	title: string;
	author: string;
};

function styleFromPaletteIndex(
	title: string,
	author: string,
	index: number,
	paletteIndex: number
): BookSpineStyle {
	return {
		color: SPINE_PALETTE[paletteIndex].color,
		text: SPINE_PALETTE[paletteIndex].text,
		width: spineWidth(title, author),
		height: spineHeight(title, author),
		wobble: spineWobble(index)
	};
}

/** Resolve palette indices sequentially, avoiding each previous displayed color. */
export function resolveStackPaletteIndices(books: BookSpineInput[]): number[] {
	let lastResolvedIndex: number | undefined;

	return books.map((book) => {
		const paletteIndex = resolvePaletteIndex(book.title, book.author, lastResolvedIndex);
		lastResolvedIndex = paletteIndex;
		return paletteIndex;
	});
}

/** Stack-safe spine styles: each book avoids the previous book's displayed color. */
export function bookSpineStackStyles(books: BookSpineInput[]): BookSpineStyle[] {
	let lastResolvedIndex: number | undefined;

	return books.map((book, index) => {
		const paletteIndex = resolvePaletteIndex(book.title, book.author, lastResolvedIndex);
		lastResolvedIndex = paletteIndex;
		return styleFromPaletteIndex(book.title, book.author, index, paletteIndex);
	});
}

export function bookSpineStyle(
	title: string,
	author: string,
	index: number,
	previous?: BookSpineNeighbor
): BookSpineStyle {
	const avoidIndex = previous
		? resolvePaletteIndex(previous.title, previous.author)
		: undefined;
	const paletteIndex = resolvePaletteIndex(title, author, avoidIndex);

	return styleFromPaletteIndex(title, author, index, paletteIndex);
}
