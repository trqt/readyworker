<script lang="ts">
	import type { PageData } from './$types';
	import { del, get } from '$lib/api';
	import token from '$lib/stores/token';
	import userid from '$lib/stores/userid';
	import { browser } from '$app/environment';
	let user = { name: '...', description: '...', photo_url: '' };
	let comments: any[] = [];

	if ($token == '') {
		if (browser) {
			window.location.href = '/login';
		}
	}

	export let data: PageData;

	get(`user/${data.slug}`, $token).then((res) => {
		user = res;
	});
	get(`comments/${data.slug}`, $token).then((res) => {
		comments = res;
	});

	async function author(id: number) {
		let author = '...';
		const res = await get(`user/${id}`, $token);
		author = res.name;
		return author;
	}

	function delete_comment(id: number) {
		del(`comment/${id}`, $token).then(() => {
			if (browser) {
				window.location.reload();
			}
		});
	}

	let gig_desc: string;
	function create_gig(_: any) {}
</script>

<svelte:head>
	<title>ReadyWorker | {user.name}</title>
</svelte:head>

<h1>Perfil de {user.name}</h1>
{#if user.photo_url == ''}
	<img src="/avatar.png" alt="Avatar de {user.name}" />
{:else}
	<img src={user.photo_url} alt="Avatar de {user.name}" />
{/if}
<br />
<span>{user.description}</span>
<hr />
<h3>Requisição de trabalho</h3>
<form action="" on:submit|preventDefault={create_gig}>
	Descrição:<br />
	<textarea name="gig_desc" id="gig_desc" cols="30" rows="10" required bind:value={gig_desc} />
	<button>Requisitar trabalho</button>
</form>
<h2>Comentários</h2>
{#each comments as comment}
	<h3>
		Autor: {#await author(comment.author_id) then author_name}
			<a href="/user/{comment.author_id}" target="_blank" rel="noreferrer">{author_name}</a>
		{/await}
		<!-- TODO: Limit to 1 trailling number -->
		Nota: {comment.rating / 2}
	</h3>
	<div>{comment.content}</div>
	<br />
	<!-- TODO: Admin -->

	{#if comment.author_id == $userid}
		<button
			on:click={() => {
				delete_comment(comment.ID);
			}}>Deletar comentário</button
		>
	{/if}
{/each}
