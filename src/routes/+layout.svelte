<script lang="ts">
	import { browser } from '$app/environment';
	import { get } from '$lib/api';
	import token from '$lib/stores/token';
	import userid from '$lib/stores/userid';

	let user = { name: '...', description: '...', role: '...', photo_url: '/avatar.png' };
	get(`user/${$userid}`, $token).then((res) => {
		user = res;
		if (user.photo_url == '') {
			user.photo_url = '/avatar.png';
		}
	});

	let logged = false;
	if (browser) {
		if ($token) {
			logged = true;
		}
	}
	function logoff() {
		if (browser) {
			localStorage.clear();
			window.location.reload();
		}
	}
</script>

<nav id="menu-horiz">
	<ul>
		<li>
			<a href="/login">Login</a>
			<a href="/signup">Cadastre-se</a>
			<a href="/"><img src="/favicon.png" alt="ReadyWorker Icon" /></a>
			<a href="/search">Procurar profissional</a>
			{#if logged}<a href="/pending">Trabalhos</a>{/if}
			<a href="/about">Sobre nós</a>
			{#if logged}
				<a href={`/user/${$userid}`}
					><img src={user.photo_url} class="avatar" alt={user.name} />
				</a>
				<button on:click={logoff}>Sair</button>
			{/if}
		</li>
	</ul>
</nav>

<slot />

<div class="outroslinks">
	<div class="colink">
		<ul>
			<li><a class="linkext" href="/faq">Duvidas com o site</a></li>
			<li><a class="linkext" href="/faq">Duvidas ao empregar</a></li>
			<li><a class="linkext" href="/faq">Duvidas de Contratante</a></li>
		</ul>
	</div>
	<div class="colink">
		<ul>
			<li><a class="linkext" href="/faq">Problemas com contas falsas</a></li>
			<li><a class="linkext" href="/tos">Termos de uso</a></li>
			<li><a class="linkext" href="/about">Mais de nosso trabalho</a></li>
		</ul>
	</div>
</div>
