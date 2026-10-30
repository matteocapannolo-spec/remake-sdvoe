<script>
	// Board cards on four columns; the president's card is always the wide, featured one.
	// Used on the Alliance page and under each biography.
	import BoardCard from '$lib/components/BoardCard.svelte';

	let { people } = $props();
</script>

<ul role="list" class="board-grid">
	{#each people as person}
		{@const featured = person.role === 'President'}
		<li class:featured><BoardCard {person} {featured} /></li>
	{/each}
</ul>

<style>
	.board-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		margin: 0;
		padding: 0;
	}
	.featured {
		grid-column: span 2;
	}
	@media (max-width: 900px) {
		.board-grid {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media (max-width: 480px) {
		.board-grid {
			grid-template-columns: 1fr;
		}
		.featured {
			grid-column: auto;
		}
	}
</style>
