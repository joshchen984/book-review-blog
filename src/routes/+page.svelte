<script lang="ts">
	import ReviewLink from '$lib/review-link.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Josh's Book Review Blog</title>
	<meta
		name="description"
		content="I am a college student who likes to read, and here is where I review the books I've read!"
	/>
</svelte:head>

<div class="mb-8">
	<h1 class="mb-1 text-4xl font-bold text-heading">Book Reviews</h1>
	{#if data.query !== ''}
		Results for "{data.query}"
	{/if}
</div>

{#each data.posts as post}
	<ReviewLink
		bookTitle={post.bookTitle}
		author={post.author}
		path={post.path}
		dateCreated={post.dateCreated}
	/>
{/each}
