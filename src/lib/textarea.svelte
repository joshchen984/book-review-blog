<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;
</script>

<div class="group relative w-full">
	<label
		for={id}
		class="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
		>{label}</label
	>
	<textarea
		{id}
		{name}
		class="peer min-h-96 w-full rounded-md bg-gray-50 p-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
	/>
</div>
