<script lang="ts">
	import { browser } from '$app/environment';

	import token from '$lib/stores/token';
	import userid from '$lib/stores/userid';

	let cpf = '';
	let password = '';

	function onSubmit(_: any) {
		const data = { cpf: cpf, password: password };
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
				if (json.userid == undefined || json.token == undefined) {
					alert('Usuário não cadastrado e/ou senha errada');
					window.location.reload();
					return;
				}

				userid.set(json.userid);
				token.set(json.token);

				if (browser) {
					window.location.href = '/';
				}
			});
	}
</script>

<svelte:head>
	<title>ReadyWorker | Login</title>
</svelte:head>

<main>
	<p class="title">Login</p>
	<form on:submit|preventDefault={onSubmit}>
		<input
			type="text"
			class="login"
			placeholder="CPF"
			name="cpf"
			size="11"
			maxlength="11"
			minlength="11"
			pattern="[0-9.]+"
			bind:value={cpf}
			required
		/><br />

		<input
			type="password"
			name="password"
			class="login"
			placeholder="Senha"
			bind:value={password}
			required
		/><br />
		<button type="submit" class="submit-btn">Enviar</button>
	</form>
</main>
