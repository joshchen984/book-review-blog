<script lang="ts">
	import Input from '$lib/input.svelte';
	import type { ActionData } from '../$types';

	export let form: ActionData;
</script>

<div class="mb-8">
	<h1 class="mb-1 text-4xl font-bold text-heading">Subscribe to Newsletter</h1>
</div>

<form method="POST" action="?/subscribe" class="flex flex-col items-center">
	<Input id="login-password" name="email" label="Email" type="text" />
	<button
		type="submit"
		class="mt-5 w-48 rounded-full bg-primary-main p-2 text-white shadow-xl hover:bg-primary-light"
		>Submit</button
	>
	{#if form && 'error' in form}
		{form.error}
	{/if}
</form>
