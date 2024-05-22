<script lang="ts">
	export let bookTitle: string;
	export let author: string;
	export let path: string;
	export let dateCreated: Date;
</script>

<a href={`posts/${path}`} class="group mb-6 block">
	<p>
		<span class="font-medium text-primary-main group-hover:text-primary-light">{bookTitle}</span>
		<span class="font-medium">by {author}</span>
	</p>
	<span class="text-gray">{dateCreated.toDateString()}</span>
</a>
