<script lang="ts">
	import { browser } from '$app/environment';

	import { get } from '$lib/api';

	let photo_url = '';
	let cpf = '';
	let name = '';
	let email = '';
	let phone = '';
	let desc = '';
	let category = '';
	let password = '';
	let password_check = '';

	let category_list: string[] = ['...'];
	get('categories', '').then((res) => {
		category_list = res;
	});

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
			photo_url: photo_url,
			category: category,
			phone: phone,
			description: desc,
			password: password
		};

		fetch('/api/signup', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {
			if (res.ok && browser) {
				if (browser) {
					alert('PERFIL CRIADO 👍');
					window.location.href = '/login';
				}
			} else if (!res.ok) {
				res.json().then((error) => {
					alert(`ERRO: ${error.error}`);
				});
			}
		});
	}

	// File Upload
	let fileInput: any;
	let files: any;
	let avatar: any;
	const baseUrl = 'https://readyworker.blob.core.windows.net/avatars/avatars/';

	function getBase64(image: any) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e?.target?.result;
			uploadFunction(e?.target?.result?.toString() ?? '');
		};
	}
	async function uploadFunction(imgBase64: string) {
		const data: any = {};
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
		console.log(data);

		let res = await fetch(`/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify(data)
		});
		let fileName = await res.json();

		photo_url = baseUrl + fileName;
	}
</script>

<svelte:head>
	<title>ReadyWorker | Cadastro Trabalhador</title>
</svelte:head>

<main>
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<label for="name">Avatar Upload</label>
			{#if avatar}
				<img id="avatar" src={avatar} width="256" height="256" alt="avatar" />
			{:else}
				<img id="avatar" src="avatar.png" width="256" height="256" alt="avatar" />
			{/if}
			<input
				id="file-to-upload"
				type="file"
				accept=".jpeg,.jpg"
				bind:files
				bind:this={fileInput}
				on:change={() => getBase64(files[0])}
				required
			/>
		</div>
		<button on:click={() => fileInput.click()}>Upload</button>
		<div>
			<label for="name">CPF</label>
			<input
				type="text"
				name="cpf"
				size="11"
				maxlength="11"
				placeholder="12345678910"
				pattern="[0-9.]+"
				required
				bind:value={cpf}
			/>
		</div>
		<div>
			<label for="name">Nome</label>
			<input
				type="text"
				name="name"
				maxlength="50"
				placeholder="João Ninguém"
				required
				bind:value={name}
			/>
		</div>
		<div>
			<label for="name">E-mail</label>
			<input
				type="email"
				name="email"
				maxlength="50"
				placeholder="email@exemplo.com"
				required
				bind:value={email}
			/>
		</div>
		<div>
			<label for="name">Telefone</label>
			<input
				type="tel"
				name="phone"
				size="20"
				maxlength="20"
				placeholder="(11) 91234-5678"
				required
				bind:value={phone}
			/>
		</div>
		<div>
			<label for="categories">Escolha uma categoria:</label>
			<select id="categories" name="categories" bind:value={category}>
				{#each category_list as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="name">Descrição</label>
			<textarea
				name="desc"
				maxlength="500"
				placeholder="Sou um pedreiro, trabalho há 5 anos com a profissão..."
				required
				bind:value={desc}
			/>
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
