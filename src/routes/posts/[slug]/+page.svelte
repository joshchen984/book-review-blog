<script lang="ts">
	import { browser } from '$app/environment';
	import SvelteMarkdown, { type Renderers } from 'svelte-markdown';
	import { trackPostView } from '$lib/analytics';
	import Stars from '$lib/stars.svelte';
	import type { PageData } from './$types';
	import MarkdownParagraph from './markdown-paragraph.svelte';
	import MarkdownOrderedListItem from './markdown-ordered-list-item.svelte';
	import MarkdownList from './markdown-list.svelte';
	$: config = {
		readOnly: true,
		countStars: 5,
		score: data.rating,
		showScore: false,
		name: 'review-stars',
		scoreFormat: () => '',
		range: { min: 0, max: 5, step: 0.5 },
		starConfig: {
			size: 20,
			fillColor: '#c0392b',
			strokeColor: '#c0392b',
			unfilledColor: '#faf7f2',
			strokeUnfilledColor: '#c0392b'
		}
	};
	const renderers: Partial<Renderers> = {
		paragraph: MarkdownParagraph,
		list: MarkdownList,
		orderedlistitem: MarkdownOrderedListItem
	};

	export let data: PageData;

	$: if (browser && data.book.title) {
		trackPostView(data.book.title);
	}
</script>

<svelte:head>
	<title>{data.book.title} by {data.book.author} Book Review | Josh's Book Review Blog</title>
	<meta name="description" content={data.content} />
</svelte:head>

<article>
	<header class="mb-8 border-b border-line pb-6">
		<p class="label mb-2 font-sans text-[11px] font-medium uppercase tracking-widest text-hint">
			Review
		</p>
		<h1 class="font-display text-3xl font-normal text-ink">
			{data.book.title}
		</h1>
		<p class="mt-1 font-sans text-sm text-muted">by {data.book.author}</p>
		<p class="mt-2 font-sans text-xs text-hint">Posted {data.dateCreated.toDateString()}</p>
	</header>

	<div class="mb-8 rounded-lg border border-line bg-surface p-5 md:mb-12">
		<div
			class="mb-5 flex flex-col items-center gap-4 sm:float-left sm:mb-0 sm:mr-6 sm:items-start"
		>
			<img
				class="w-40 max-w-full rounded-md shadow-sm"
				src={data.book.coverUrl}
				alt="Cover of {data.book.title}"
			/>
			<div class="flex items-center gap-2">
				<span class="font-sans text-xs text-muted">My rating</span>
				<Stars {config} />
			</div>
		</div>
		<p class="whitespace-pre-line font-body text-base leading-loose text-ink">
			{data.book.description}
		</p>
		<div class="clear-both"></div>
	</div>

	<div class="prose clear-both font-body text-base leading-loose text-ink">
		<SvelteMarkdown source={data.content} options={{ breaks: true }} {renderers} />
	</div>
</article>
