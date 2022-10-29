<script lang="ts">
	import { get } from '$lib/api';
	import token from '$lib/stores/token';
	import { browser } from '$app/environment';

	let gigs: any = {};

	if ($token == '') {
		if (browser) {
			window.location.href = '/login';
		}
	}

	get(`gigs`, $token).then((res) => {
		gigs = res;
	});
	console.log(gigs);
</script>

<svelte:head>
	<title>ReadyWorker | Trabalhos Pendentes</title>
</svelte:head>

<main>
	{#each gigs as gig}
		<h2>Trabalho</h2>
		Completado: {gig.completed}
		Aprovado: {gig.approved}
		Descrição: {gig.description}
	{/each}
</main>

<style>
	* {
		box-sizing: border-box;
	}
</style>
