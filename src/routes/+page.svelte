<script lang="ts">
	import { browser } from '$app/environment';
	import { get } from '$lib/api';
	import token from '$lib/stores/token';
	import userid from '$lib/stores/userid';

	let logged = false;
	if (browser) {
		if ($token) {
			logged = true;
		}
	}

	let user = { name: '...', description: '...', role: '...' };
	get(`user/${$userid}`, $token).then((res) => {
		user = res;
	});

	let showsearch = false;
	let category_list: string[] = ['...'];
	if (user.role == 'hirer') {
		showsearch = true;

		get('categories', '').then((res) => {
			category_list = res;
		});
	}

	let category = 'none';

	function redirectToCategory(_: any) {
		if (browser) {
			window.location.href = `/category/${category}`;
		}
	}

	function logoff() {
		if (browser) {
			//localStorage.removeItem('token');
			//localStorage.removeItem('userid');
			localStorage.clear();
			window.location.reload();
		}
	}
</script>

<svelte:head>
	<title>ReadyWorker</title>
</svelte:head>

{#if logged}
	Bem-vindo {user.name}!
	{#if showsearch}
		<form on:submit|preventDefault={redirectToCategory}>
			<label for="categories">Achar profissionais:</label>
			<select id="categories" name="categories" bind:value={category}>
				{#each category_list as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
			<button type="submit">Pesquisar</button>
		</form>
	{/if}

	<br />
	<button on:click={logoff}>Sair</button>
{:else}
	<h1>ReadyWorker</h1>

	<a href="login">Login</a>
	<a href="signup">Cadastre-se</a>
{/if}
