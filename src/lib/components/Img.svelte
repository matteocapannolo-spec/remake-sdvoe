<script>
	// Image with a graceful fallback: if the file can't load (offline, blocked host, missing upload)
	// the slot content is shown instead of a broken-image icon.
	let { src, alt = '', fallback, class: cls = '', ...rest } = $props();
	let failed = $state(false);
</script>

{#if failed}
	{@render fallback?.()}
{:else}
	<img {src} {alt} class={cls} {...rest} onerror={() => (failed = true)} />
{/if}
