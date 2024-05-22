<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;
	export let helperText: string = '';
	export let type: string = 'text';
</script>

<div class="group relative w-full">
	<label
		for={id}
		class="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
		>{label}</label
	>
	<input
		{id}
		{type}
		{name}
		class="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
	/>
	{#if helperText !== ''}
		<span
			class="absolute block pt-1 text-xs font-semibold text-gray-500 opacity-0 transition-all duration-200 ease-in-out group-focus-within:opacity-100"
			>{helperText}</span
		>
	{/if}
</div>
