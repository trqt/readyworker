<script lang="ts">
	import { browser } from '$app/environment';

	import { get } from '$lib/api';

	let category: string = '';
	let category_list: string[] = ['...'];
	get('categories', '').then((res) => {
		category_list = res;
	});

	function searchWorker() {
		if (browser) {
			window.location.href = `/category/${category}`;
		}
	}
</script>

<article>
	<form on:submit|preventDefault={searchWorker}>
		<label for="categories">Escolha uma categoria da lista:</label>
		<input list="categories" name="category" id="category" bind:value={category} />
		<datalist id="categories">
			{#each category_list as category}
				<option value={category}>{category}</option>
			{/each}
		</datalist>
		<button type="submit">Pesquisar</button>
	</form>
</article>
