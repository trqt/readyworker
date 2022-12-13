<script lang="ts">
	import { browser } from '$app/environment';

	import { get } from '$lib/api';

	let category = '';
	let category_list = ['...'];
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
		<select id="categories" bind:value={category}>
			{#each category_list as category}
				<option value={category}>{category}</option>
			{/each}
		</select>
		<button type="submit" class="search-btn">Pesquisar</button>
	</form>
</article>
