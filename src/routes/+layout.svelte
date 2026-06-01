<script lang="ts">
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { isAnalyticsEnabled, trackPageView } from '$lib/analytics';
	import '../global.css';
	import '../app.css';
	import Nav from '$lib/nav.svelte';

	if (browser && isAnalyticsEnabled(window.location.pathname)) {
		trackPageView(window.location.pathname);
	}

	afterNavigate(({ from, to }) => {
		if (from && to && isAnalyticsEnabled(to.url.pathname)) {
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
