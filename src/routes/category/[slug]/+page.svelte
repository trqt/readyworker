<script lang="ts">
	import type { PageData } from './$types';
	import { get } from '$lib/api';
	import token from '$lib/stores/token';
	import { browser } from '$app/environment';
	let users: any[] = [];

	if ($token == '') {
		if (browser) {
			alert('É preciso estar cadastrado para pesquisar.');
			window.location.href = '/login';
		}
	}

	export let data: PageData;

	get(`category/${data.slug}`, $token).then((res) => {
		if (res.error) {
			if (browser) {
				window.location.href = '/login';
			}
		}

		users = res;
	});
</script>

<article>
	{#if users.length == 0}
		<p class="title">404 - Nenhum usuário encontrado</p>
	{:else}
		{#each users as user}
			<h3>
				<a href={`/user/${user.ID}`}>{user.name}</a>
			</h3>
			<div>{user.description}</div>
			<br />
		{/each}
	{/if}
</article>
