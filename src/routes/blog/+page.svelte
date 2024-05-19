<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>

<h1>Hello</h1>

{#each data.posts as post}
<a href="/blog/{post.path}">{post.title}</a>
{/each}
