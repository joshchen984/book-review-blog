<script lang="ts">
	import { goto } from '$app/navigation';
	import NewsletterModal from './newsletter-modal.svelte';
	let modal: NewsletterModal;

	let query = '';
	function handleSearch() {
		const route = `/?q=${query}`;
		query = '';
		goto(route);
	}
</script>

<header class="fixed top-0 z-30 w-full border-b border-line bg-bg/95 backdrop-blur-sm">
	<nav class="mx-auto flex max-w-[960px] flex-col items-center gap-3 px-6 py-4 sm:flex-row sm:justify-between sm:px-8">
		<a href="/" class="font-display text-xl italic text-ink no-underline">Josh's Book Blog</a>
		<div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
			<button
				type="button"
				on:click={() => modal.open()}
				class="rounded-full border border-accent bg-accent px-4 py-1.5 font-sans text-xs font-semibold text-white shadow-sm transition-colors hover:border-accent-text hover:bg-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
			>
				Subscribe
			</button>
			<form on:submit|preventDefault={handleSearch} class="w-full min-w-[180px] sm:w-48">
				<input
					class="w-full rounded-full border border-line bg-surface px-3 py-1 font-sans text-xs text-ink placeholder:text-hint focus:border-ink focus:outline-none"
					placeholder="Search books…"
					bind:value={query}
				/>
			</form>
		</div>
	</nav>
</header>

<NewsletterModal bind:this={modal} />
