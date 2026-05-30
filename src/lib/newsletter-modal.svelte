<script lang="ts">
	import Modal from './modal.svelte';
	import { isValidEmail } from './validation';
	let modalRef: Modal | null = null;
	let email = '';
	let message = '';
	let isError = false;

	export const open = () => {
		modalRef?.open();
		isError = false;
		message = '';
	};

	const subscribe = async () => {
		if (!isValidEmail(email)) {
			isError = true;
			message = 'Not a valid email address';
			return;
		}
		const res = await fetch('/newsletter/subscribe', {
			method: 'POST',
			body: JSON.stringify({ email }),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		if (res.status === 201) {
			email = '';
			message = 'Successfully subscribed to newsletter';
			isError = false;
		} else {
			const body: { message: string | null } = await res.json();
			message = body.message ?? 'An error occurred trying to add email to newsletter';
			isError = true;
		}
	};
</script>

<Modal bind:this={modalRef} onEnter={subscribe}>
	<div class="flex h-full w-full flex-col items-center justify-center p-4">
		<h2 class="mb-8 font-display text-2xl font-normal text-ink">Subscribe to the Newsletter</h2>
		<div class="mb-4 flex w-full max-w-sm flex-col items-center">
			<label for="newsletter-email" class="mb-1 block w-full pb-1 font-sans text-sm text-muted">
				Email
			</label>
			<input
				id="newsletter-email"
				type="email"
				name="email"
				class="h-10 w-full rounded-md border border-line bg-bg px-4 font-sans text-sm text-ink focus:border-ink focus:outline-none"
				bind:value={email}
			/>
			<p class="mt-2 font-sans text-sm text-muted">Get notified on new book reviews!</p>
			{#if message !== ''}
				{#if isError}
					<p class="mt-2 font-sans text-sm text-accent">{message}</p>
				{:else}
					<p class="mt-2 font-sans text-sm text-[#1a5020]">{message}</p>
				{/if}
			{/if}
		</div>
		<button
			on:click={subscribe}
			class="w-48 rounded-md border border-accent bg-transparent px-4 py-2 font-sans text-sm font-medium text-accent transition-colors hover:bg-accent-bg"
		>
			Subscribe
		</button>
	</div>
</Modal>
