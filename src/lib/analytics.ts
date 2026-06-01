const MEASUREMENT_ID = 'G-B0XSQNB1XV';

let initialized = false;

export function isAdminRoute(pathname: string): boolean {
	return pathname === '/admin' || pathname.startsWith('/admin/');
}

export function isAnalyticsEnabled(pathname?: string): boolean {
	if (!import.meta.env.PROD) return false;
	if (pathname && isAdminRoute(pathname)) return false;
	return true;
}

function gtag(...args: unknown[]): void {
	window.gtag?.(...args);
}

export function initAnalytics(pathname?: string): void {
	if (!import.meta.env.PROD || initialized) return;
	if (pathname && isAdminRoute(pathname)) return;

	initialized = true;

	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
	document.head.appendChild(script);

	window.dataLayer = window.dataLayer ?? [];
	window.gtag = function gtagCommand(...args: unknown[]) {
		window.dataLayer.push(args);
	};

	gtag('js', new Date());
	gtag('config', MEASUREMENT_ID, { send_page_view: false });
}

export function trackPageView(pagePath: string, pageTitle?: string): void {
	if (!isAnalyticsEnabled(pagePath)) return;

	gtag('event', 'page_view', {
		page_path: pagePath,
		page_title: pageTitle ?? document.title,
		page_location: window.location.href
	});
}

export function trackPostView(postSlug: string, postTitle: string): void {
	if (!isAnalyticsEnabled()) return;

	gtag('event', 'post_view', {
		post_slug: postSlug,
		post_title: postTitle
	});
}

export function trackNewsletterModalOpen(sourcePage: string): void {
	if (!isAnalyticsEnabled()) return;

	gtag('event', 'newsletter_modal_open', {
		source_page: sourcePage
	});
}

export function trackNewsletterSubscribe(sourcePage: string): void {
	if (!isAnalyticsEnabled()) return;

	gtag('event', 'newsletter_subscribe', {
		source_page: sourcePage
	});
}
