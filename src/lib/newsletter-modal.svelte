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
	<div class="m-0 flex h-full w-full flex-col items-center justify-center">
		<h2 class="mb-8 text-xl font-bold text-heading">Subscribe to the Newsletter</h2>
		<div class="mb-4 flex w-full flex-col items-center">
			<label for="newsletter-email" class="text-gray-500 block w-1/2 pb-1 text-sm font-medium"
				>Email</label
			>
			<input
				id="newsletter-email"
				type="email"
				name="email"
				class=" h-10 w-1/2 border border-gray bg-background px-4 font-thin"
				bind:value={email}
			/>
			<p>Get notified on new book reviews!</p>
			{#if message !== ''}
				{#if isError}
					<p class="text-red-500">{message}</p>
				{:else}
					<p class="text-green-500">{message}</p>
				{/if}
			{/if}
		</div>
		<button
			on:click={subscribe}
			class="w-48 rounded-full bg-primary-main p-2 text-white shadow-xl hover:bg-primary-light"
			>Subscribe</button
		>
	</div>
</Modal>
