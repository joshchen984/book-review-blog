<script lang="ts">
	import Stars from '$lib/stars.svelte';
	import { bookSpineStackStyles } from '$lib/book-spine';
	import type { PageData } from './$types';

	export let data: PageData;

	type Post = PageData['posts'][number];

	let selectedPath: string | null = data.posts[0]?.path ?? null;

	$: selectedPost = data.posts.find((post) => post.path === selectedPath) ?? null;
	$: stackCount = data.posts.length;
	$: stackStyles = bookSpineStackStyles(
		data.posts.map((post) => ({ title: post.bookTitle, author: post.author }))
	);

	function selectPost(post: Post) {
		selectedPath = post.path;
	}

	function starsConfig(rating: number) {
		return {
			readOnly: true,
			countStars: 5,
			score: rating,
			showScore: false,
			name: 'stack-stars',
			scoreFormat: () => '',
			range: { min: 0, max: 5, step: 0.5 },
			starConfig: {
				size: 16,
				fillColor: '#c0392b',
				strokeColor: '#c0392b',
				unfilledColor: '#faf7f2',
				strokeUnfilledColor: '#c0392b'
			}
		};
	}

	function formatYear(publishDate: Date | string | undefined): string {
		if (!publishDate) return '';
		const date = publishDate instanceof Date ? publishDate : new Date(publishDate);
		if (Number.isNaN(date.getTime())) return '';
		return String(date.getFullYear());
	}

	function excerpt(text: string, maxLength = 280): string {
		const trimmed = text.trim();
		if (trimmed.length <= maxLength) return trimmed;
		return trimmed.slice(0, maxLength).trimEnd() + '…';
	}
</script>

<svelte:head>
	<title>Josh's Book Review Blog</title>
	<meta
		name="description"
		content="I am a college student who likes to read, and here is where I review the books I've read!"
	/>
</svelte:head>

<div class="py-4 pb-8">
	{#if data.query !== ''}
		<p class="mb-4 font-sans text-sm text-muted">Results for "{data.query}"</p>
	{/if}

	<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
		<div
			class="order-2 lg:order-1 relative flex min-h-[420px] flex-col items-center justify-end rounded-lg bg-[#f0ece4] px-8 pb-4 pt-8"
		>
			{#if data.posts.length === 0}
				<p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-sans text-sm text-hint">
					No books in the stack yet.
				</p>
			{:else}
				<p class="mb-2.5 text-center font-sans text-[11px] tracking-wide text-hint">
					{stackCount} book{stackCount !== 1 ? 's' : ''} in the stack
				</p>
				<div class="flex w-full flex-col items-center gap-0">
					{#each data.posts as post, i (post.path)}
						{@const spine = stackStyles[i]}
						{@const isActive = selectedPath === post.path}
						<button
							type="button"
							class="book-spine relative flex cursor-pointer items-center justify-center rounded-[1px_3px_3px_1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
							class:active={isActive}
							style:background={spine.color}
							style:color={spine.text}
							style:width="{spine.width}px"
							style:height="{spine.height}px"
							style:--wobble="{spine.wobble}deg"
							style:margin-bottom={i === 0 ? '0' : '-1px'}
							title="{post.bookTitle} — {post.author}"
							on:click={() => selectPost(post)}
						>
							<span
								class="relative z-[1] max-w-[92%] overflow-hidden text-ellipsis whitespace-nowrap px-3 text-center text-sm font-medium"
							>
								{post.bookTitle}
							</span>
						</button>
					{/each}
				</div>
				<div class="mt-1.5 h-1 w-4/5 rounded-sm bg-line opacity-50"></div>
			{/if}
		</div>

		<div
			class="order-1 lg:order-2 sticky top-[calc(8rem+2rem+env(safe-area-inset-top))] sm:top-[calc(4.5rem+0.5rem+env(safe-area-inset-top))] self-start z-20 lg:static lg:top-auto lg:z-auto rounded-lg border border-line/80 bg-surface p-5"
			class:hidden={!selectedPost}
		>
			{#if selectedPost}
				{@const selectedIndex = data.posts.findIndex((post) => post.path === selectedPost.path)}
				{@const spine = stackStyles[selectedIndex]}
				<div class="mb-3.5 h-1.5 w-full rounded-sm" style:background={spine.color}></div>
				<h2 class="font-display text-base font-normal text-ink">{selectedPost.bookTitle}</h2>
				<p class="mb-2.5 font-sans text-xs text-muted">
					{selectedPost.author}
					{#if formatYear(selectedPost.publishDate)}
						· {formatYear(selectedPost.publishDate)}
					{/if}
				</p>
				<div class="mb-3">
					<Stars config={starsConfig(selectedPost.rating)} />
				</div>
				{#if selectedPost.description}
					<p class="mb-3 hidden font-body text-[13px] leading-relaxed text-muted sm:block">
						{excerpt(selectedPost.description)}
					</p>
				{/if}
				<a
					href="/posts/{selectedPost.path}"
					class="inline-block rounded-md border border-line px-3.5 py-1.5 font-sans text-xs text-ink transition-colors hover:bg-[#f0ece4]"
				>
					Read full review →
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.book-spine {
		overflow: hidden;
		transform: rotate(var(--wobble, 0deg));
		box-shadow:
			inset 0 2px 4px rgba(255, 255, 255, 0.18),
			inset 0 -2px 4px rgba(0, 0, 0, 0.22),
			0 1px 2px rgba(0, 0, 0, 0.12);
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			filter 180ms ease;
	}

	.book-spine::before,
	.book-spine::after {
		content: '';
		position: absolute;
		top: 12%;
		bottom: 12%;
		width: 2px;
		pointer-events: none;
	}

	.book-spine::before {
		left: 4px;
		background: rgba(255, 255, 255, 0.14);
	}

	.book-spine::after {
		right: 4px;
		background: rgba(0, 0, 0, 0.16);
	}

	.book-spine:hover:not(.active) {
		transform: translateX(10px) rotate(calc(var(--wobble, 0deg) + 1deg));
		z-index: 10;
		filter: brightness(1.06);
		box-shadow:
			inset 0 2px 4px rgba(255, 255, 255, 0.18),
			inset 0 -2px 4px rgba(0, 0, 0, 0.22),
			4px 6px 12px rgba(26, 18, 8, 0.28);
	}

	.book-spine.active {
		transform: translateX(14px) rotate(2deg);
		z-index: 10;
		outline: 2px solid #1a1208;
		outline-offset: 2px;
		box-shadow:
			inset 0 2px 4px rgba(255, 255, 255, 0.18),
			inset 0 -2px 4px rgba(0, 0, 0, 0.22),
			4px 6px 12px rgba(26, 18, 8, 0.28);
	}
</style>
