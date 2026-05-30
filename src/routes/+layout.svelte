<script lang="ts">
	import '../global.css';
	import '../app.css';
	import Nav from '$lib/nav.svelte';
</script>

<Nav />
<div class="min-h-screen w-full bg-bg px-6 pb-8 pt-40 sm:px-8 sm:pt-24">
	<div class="mx-auto max-w-[960px]">
		<slot></slot>
	</div>
</div>
