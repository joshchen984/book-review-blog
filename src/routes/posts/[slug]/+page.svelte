<script lang="ts">
	import SvelteMarkdown, { type Renderers } from 'svelte-markdown';
	import Stars from '$lib/stars.svelte';
	import type { PageData } from './$types';
	import MarkdownParagraph from './markdown-paragraph.svelte';

	$: config = {
		readOnly: true,
		countStars: 5,
		score: data.rating,
		range: { min: 0, max: 5, step: 0.5 },
		starConfig: {
			size: 20,
			fillColor: '#01550F',
			strokeColor: '#01550F',
			unfilledColor: '#FFF',
			strokeUnfilledColor: '#01550F'
		}
	};
	const renderers: Partial<Renderers> = {
		paragraph: MarkdownParagraph
	};
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.book.title} by {data.book.author} Book Review | Josh's Book Review Blog</title>
	<meta name="description" content={data.content} />
</svelte:head>

<h1 class="text-2xl font-bold text-heading">{data.book.title} by {data.book.author}</h1>
Posted {data.dateCreated.toDateString()}
<div class="mb-5 md:mb-11">
	<div
		class="float-top mx-auto mb-5 flex flex-col items-center bg-background sm:float-left sm:mr-5 sm:p-5"
	>
		<img class="mb-2" src={data.book.coverUrl} alt="Book cover" />
		<div class="flex">
			<span class="mr-2 items-center">My rating:</span>
			<Stars {config} />
		</div>
	</div>
	<p class="whitespace-pre-line rounded-md bg-[#DCDCDC] p-5">
		{data.book.description}
	</p>
</div>
<SvelteMarkdown source={data.content} options={{ breaks: true }} {renderers} />
