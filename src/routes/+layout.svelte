<script lang="ts">
	import '../global.css';
	import '../app.css';
	import Nav from '$lib/nav.svelte';
</script>

<Nav />
<div class="min-h-screen w-full bg-background px-5 pb-5 pt-32 sm:px-20 md:px-40 lg:px-60 xl:px-96">
	<slot></slot>
</div>
