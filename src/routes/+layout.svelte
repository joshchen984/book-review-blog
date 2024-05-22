<script lang="ts">
	import '../global.css';
	import '../app.css';
	import Nav from '$lib/nav.svelte';
</script>

<Nav />
<div class="bg-background w-full min-h-screen pt-24 sm:pt-16">
	<slot></slot>
</div>
