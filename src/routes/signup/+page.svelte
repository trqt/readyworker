<script lang="ts">
	let cpf = '';
	let name = '';
	let email = '';
	let desc = '';
	let password = '';

	function onSubmit(e: any) {
		// TODO: Validate input
		const data = {
			role: 'worker',
			cpf: cpf,
			name: name,
			email: email,
			description: desc,
			password: password
		};

		fetch('http://localhost:8080/signup', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((r) => r.json())
			.then((json) => {
				console.log(json);
			});
	}
</script>

<svelte:head>
	<title>ReadyWorker | Login</title>
</svelte:head>

<main>
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<label for="name">CPF</label>
			<input type="text" name="cpf" required bind:value={cpf} />
		</div>
		<div>
			<label for="name">Nome</label>
			<input type="text" name="name" required bind:value={name} />
		</div>
		<div>
			<label for="name">E-mail</label>
			<input type="email" name="email" required bind:value={email} />
		</div>
		<div>
			<label for="name">Descrição</label>
			<textarea name="desc" required bind:value={desc} />
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
