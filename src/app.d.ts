// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface Window {
		// Queue of gtag commands processed when the GA script loads
		dataLayer: unknown[];
		// Pushes analytics commands onto dataLayer (e.g. page_view, post_view)
		gtag: (...args: unknown[]) => void;
	}
}

export {};
