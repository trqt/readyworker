<script lang="ts">
	import { get } from '$lib/api';
	import token from '$lib/stores/token';
	import userid from '$lib/stores/userid';
	let user = { name: '...', description: '...' };
	get(`user/${$userid}`, $token).then((res) => {
		user = res;
	});
</script>

<svelte:head>
	<title>ReadyWorker | Usuário</title>
</svelte:head>

<main>
	<h1>Perfil de {user.name}</h1>

	TODO: Cardzinho<br /> Descrição: {user.description}
</main>

<style>
	* {
		box-sizing: border-box;
	}
</style>
