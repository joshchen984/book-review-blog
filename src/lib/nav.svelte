<script lang="ts">
	import { goto } from '$app/navigation';

	let query = '';
	function handleSearch() {
		const route = `/?q=${query}`;
		query = '';
		goto(route);
	}
</script>

<nav
	class="fixed top-0 z-50 flex h-20 w-screen flex-col items-center justify-around bg-nav shadow-sm shadow-nav sm:h-14 sm:flex-row sm:justify-end sm:px-8"
>
	<a href="/" class="sm:mr-5">Home</a>
	<form on:submit|preventDefault={handleSearch} class="w-5/6 sm:max-w-96">
		<input class="w-full rounded-2xl px-4 py-0.5" placeholder="Search" bind:value={query} />
	</form>
</nav>
