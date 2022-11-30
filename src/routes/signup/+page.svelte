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
	let role = 'worker';

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
			role: role,
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
		<p class="title">Cadastro</p>
		<div>
			{#if avatar}
				<img id="avatar" class="cat" src={avatar} width="256" height="256" alt="avatar" />
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
		<button on:click={() => fileInput.click()} class="submit-btn">Upload da foto de perfil</button
		><br />

		<input
			type="text"
			name="name"
			class="cadastro"
			maxlength="50"
			placeholder="Nome completo"
			bind:value={name}
			required
		/><br />
		<input
			type="text"
			class="cadastro"
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
			type="email"
			class="cadastro"
			name="email"
			placeholder="Email"
			maxlength="50"
			bind:value={email}
			required
		/><br />
		<input
			type="tel"
			name="phone"
			size="20"
			maxlength="20"
			class="cadastro"
			placeholder="Telefone"
			bind:value={phone}
			required
		/><br />
		<textarea
			class="cadastrolongo"
			name="desc"
			maxlength="500"
			placeholder="Descrição"
			bind:value={desc}
			required
		/><br />
		<label for="categories" class="cat">Escolha uma categoria:</label>
		<select id="categories" class="cat" name="categories" bind:value={category} required>
			{#each category_list as category}
				<option value={category}>{category}</option>
			{/each}
		</select><br />
		<input
			type="password"
			class="cadastro"
			name="password"
			placeholder="Senha"
			bind:value={password}
			minlength="8"
			required
		/><br />
		<input
			type="password"
			class="cadastro"
			name="password"
			placeholder="Repita a senha"
			minlength="8"
			bind:value={password_check}
			required
		/><br />
		<input type="radio" class="tos" id="worker" name="role" value="worker" bind:group={role} />
		<label for="worker">Trabalhador</label><br />
		<input type="radio" class="tos" id="hirer" name="role" value="hirer" bind:group={role} />
		<label for="hirer">Contrantante</label><br />

		<input type="checkbox" class="tos" id="tos" name="tos" value="tos" required />
		<label for="tos">Li e concordo com os <a href="/tos">Termos de Uso</a></label>

		<button type="submit" class="submit-btn">Enviar</button>
	</form>
</main>
