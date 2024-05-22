<script lang="ts">
	import ReviewLink from '$lib/review-link.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1 class="mb-8 text-4xl font-bold text-heading">Book Reviews</h1>

{#each data.posts as post}
	<ReviewLink
		bookTitle={post.bookTitle}
		author={post.author}
		path={post.path}
		dateCreated={post.dateCreated}
	/>
{/each}
