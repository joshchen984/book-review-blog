<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { initAnalytics, isAnalyticsEnabled, trackPageView } from '$lib/analytics';
	import '../global.css';
	import '../app.css';
	import Nav from '$lib/nav.svelte';

	onMount(() => {
		initAnalytics($page.url.pathname);
	});

	afterNavigate(({ to }) => {
		if (to && isAnalyticsEnabled(to.url.pathname)) {
			trackPageView(to.url.pathname);
		}
	});
</script>

<Nav />
<div class="min-h-screen w-full bg-bg px-6 pb-8 pt-40 sm:px-8 sm:pt-24">
	<div class="mx-auto max-w-[960px]">
		<slot></slot>
	</div>
</div>
