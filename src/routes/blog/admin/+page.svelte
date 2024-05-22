<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<form method="POST" action="?/createPost">
	<input type="textarea" name="content" placeholder="content" />
	<input type="textarea" name="title" placeholder="title" />
	<input type="textarea" name="book-title" placeholder="book title" />
	<input type="number" name="rating" placeholder="rating" />
	<input type="textarea" name="path" placeholder="path" />
	<button>Submit</button>
</form>
{form?.title}
