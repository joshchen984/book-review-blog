<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import Input from '$lib/input.svelte';
	import Textarea from '$lib/textarea.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<form method="POST" action="?/createPost" class="flex flex-col items-center">
	<div class="mb-5 flex h-80 w-full flex-col justify-between">
		<Input id="create-title" name="title" label="Post Title" />
		<Input id="create-book-title" name="book-title" label="Book Title" />
		<Input
			id="create-rating"
			name="rating"
			label="Rating"
			type="number"
			helperText="Number from 1-5"
		/>
		<Input id="create-path" name="path" label="Path" helperText="Don't include / at beginning" />
	</div>
	<Textarea name="content" id="create-content" label="Content" />
	<Textarea name="book-summary" id="create-book-summary" label="Book Summary" />
	<button
		type="submit"
		class="w-48 rounded-full bg-primary-main p-2 text-white shadow-xl hover:bg-primary-light"
		>Submit</button
	>
</form>
{form?.title}
