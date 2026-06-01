<!-- SEO head tags (title, description, canonical, OG/Twitter). Optional jsonLd injects structured data for crawlers. -->
<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let description: string;
	export let image: string | undefined = undefined;
	export let type: 'website' | 'article' = 'website';
	export let jsonLd: Record<string, unknown> | undefined = undefined;

	const siteName = "Josh's Book Review Blog";

	$: origin = $page.url.origin;
	$: canonical = `${origin}${$page.url.pathname}`;
	$: ogImage = image ?? `${origin}/favicon.png`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content="en_US" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	{#if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`}
	{/if}
</svelte:head>
