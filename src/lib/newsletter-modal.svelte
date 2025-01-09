<script lang="ts">
	import Input from './input.svelte';
	import Modal from './modal.svelte';
	let modalRef: Modal | null = null;

	export const open = () => {
		modalRef?.open();
	};
</script>

<Modal bind:this={modalRef}>
	<div class="m-0 flex h-full w-full flex-col items-center justify-center">
		<h2 class="mb-8 text-xl font-bold text-heading">Subscribe to the Newsletter</h2>
		<form method="POST" action="" class="flex w-full flex-col items-center">
			<label for="newsletter-email" class="text-gray-500 block w-1/2 pb-1 text-sm font-medium"
				>Email</label
			>
			<input
				id="newsletter-email"
				type="email"
				name="email"
				class="mb-4 h-10 w-1/2 border border-gray px-4 font-thin"
			/>
			<button
				type="submit"
				class="w-48 rounded-full bg-primary-main p-2 text-white shadow-xl hover:bg-primary-light"
				>Subscribe</button
			>
		</form>
	</div>
</Modal>
