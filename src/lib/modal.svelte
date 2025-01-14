<script lang="ts">
	export let onEnter: () => void = () => {};
	let visible = false;

	function keyPress(e: KeyboardEvent) {
		if (e.key == 'Escape') {
			close();
		} else if (e.key == 'Enter') {
			onEnter();
		}
	}

	export const open = () => {
		if (visible) {
			return;
		}
		window.addEventListener('keydown', keyPress);
		document.body.style.overflow = 'hidden';
		visible = true;
	};

	export const close = () => {
		if (!visible) {
			return;
		}
		window.removeEventListener('keydown', keyPress);
		document.body.style.overflow = '';
		visible = false;
	};
</script>

{#if visible}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="fixed left-0 top-0 z-40 h-full w-full bg-black/50" on:click={close} role="dialog">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="relative left-1/2 top-1/2 z-50 w-full max-w-screen-sm translate-x-[-50%] translate-y-[-50%] bg-background p-4"
			on:click|stopPropagation={() => {}}
		>
			<button class="float-right text-xl hover:font-bold" on:click={close}>&times;</button>
			<slot />
		</div>
	</div>
{/if}
