<script lang="ts">
	let cpf = '';
	let name = '';
	let email = '';
	let phone = 'LEMBRAR';
	let desc = '';
	let category = '';
	let password = '';
	let password_check = '';

	function onSubmit(_: any) {
		// TODO: Validate input
		// TODO: Upload photo to azure

		if (password != password_check) {
			alert('Senhas não são iguais');
			return;
		}

		const data = {
			role: 'worker',
			cpf: cpf,
			name: name,
			email: email,
			phone: phone,
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
	<title>ReadyWorker | Cadastro Trabalhador</title>
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
			<!-- TODO: Puxar do BD -->
			<label for="categories">Escolha uma categoria:</label>
			<select id="categories" name="categories" bind:value={category}>
				<option value="pedreiro">Pedreiro</option>
				<option value="programador">Pedreiro Digital</option>
				<option value="sitiante">Atendente de bar</option>
			</select>
		</div>
		<div>
			<label for="name">Descrição</label>
			<textarea name="desc" required bind:value={desc} />
		</div>
		<div>
			<label for="name">Senha</label>
			<input type="password" required name="password" bind:value={password} />
		</div>
		<div>
			<label for="name">Confirmar senha</label>
			<input type="password" required name="password" bind:value={password_check} />
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
