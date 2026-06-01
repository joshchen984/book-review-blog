export function isAdminRoute(pathname: string): boolean {
	return pathname === '/admin' || pathname.startsWith('/admin/');
}

export function isAnalyticsEnabled(pathname?: string): boolean {
	if (!import.meta.env.PROD) return false;
	if (pathname && isAdminRoute(pathname)) return false;
	return true;
}

function gtagEvent(eventName: string, params: Record<string, unknown>): void {
	window.gtag('event', eventName, params);
}

export function trackPageView(pagePath: string, pageTitle?: string): void {
	if (!isAnalyticsEnabled(pagePath)) return;

	gtagEvent('page_view', {
		page_path: pagePath,
		page_title: pageTitle ?? document.title,
		page_location: window.location.href
	});
}

export function trackPostView(postTitle: string): void {
	if (!isAnalyticsEnabled()) return;

	gtagEvent('post_view', { post_title: postTitle });
}

export function trackNewsletterModalOpen(sourcePage: string): void {
	if (!isAnalyticsEnabled()) return;

	gtagEvent('newsletter_modal_open', { source_page: sourcePage });
}

export function trackNewsletterSubscribe(sourcePage: string): void {
	if (!isAnalyticsEnabled()) return;

	gtagEvent('newsletter_subscribe', { source_page: sourcePage });
}
