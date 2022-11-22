<script lang="ts">
	import { browser } from '$app/environment';

	import token from '$lib/stores/token';
	import userid from '$lib/stores/userid';

	//let cpf = '';
	let email = '';
	let password = '';

	function onSubmit(_: any) {
		const data = { email: email, password: password };
		fetch('/api/login', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((r) => r.json())
			.then((json) => {
				userid.set(json.userid);
				token.set(json.token);

				if (browser) {
					alert('LOGADO 👍');
					window.location.href = '/';
				}
			});
	}
</script>

<svelte:head>
	<title>ReadyWorker | Login</title>
</svelte:head>

<main>
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<label for="name">E-mail</label>
			<input type="email" name="email" required bind:value={email} />
		</div>
		<div>
			<label for="name">Senha</label>
			<input type="password" required name="password" bind:value={password} />
		</div>
		<button type="submit">Enviar</button>
	</form>
</main>

<style>
	* {
		box-sizing: border-box;
	}
	form {
		display: flex;
		flex-direction: column;
		width: 300px;
	}

	form > div {
		display: flex;
		justify-content: space-between;
	}

	form > div + * {
		margin-top: 10px;
	}
</style>
