<script lang="ts">
	import Input from '$lib/input.svelte';
	import type { ActionData } from '../$types';

	export let form: ActionData;
</script>

<form method="POST" action="?/login" class="flex flex-col items-center">
	<Input id="login-password" name="password" label="Password" type="password" />
	<button
		type="submit"
		class="mt-5 w-48 rounded-full bg-primary-main p-2 text-white shadow-xl hover:bg-primary-light"
		>Submit</button
	>
	{#if form && 'error' in form}
		{form.error}
	{/if}
</form>
