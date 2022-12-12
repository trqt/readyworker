<script lang="ts">
	import { del, get, post } from '$lib/api';
	import token from '$lib/stores/token';
	import userid from '$lib/stores/userid';
	import { browser } from '$app/environment';

	let gigs: any = {};
	let comment = '';
	let rating = 0;

	if ($token == '') {
		if (browser) {
			window.location.href = '/login';
		}
	}

	get(`gigs`, $token).then((res) => {
		gigs = res;
	});

	let role: string;
	get(`user/${$userid}`, $token).then((res) => {
		role = res.role;
	});

	async function get_worker_name(id: number) {
		return (await get(`user/${id}`, $token)).name;
	}

	function approve_gig(id: number) {
		post(`approve/${id}`, null, $token).then(() => {
			if (browser) {
				window.location.reload();
			}
		});
	}

	function complete_gig(id: number) {
		post(`complete/${id}`, null, $token).then(() => {
			if (browser) {
				window.location.reload();
			}
		});
	}

	function delete_gig(id: number) {
		del(`gig/${id}`, $token);
		alert('Pedido cancelado.');
		if (browser) {
			window.location.reload();
		}
	}

	function commentGig(gig_id: number, worker_id: number) {
		rating = rating * 2;
		let author_id: number = Number($userid);
		post(
			`comment`,
			{
				rating: rating,
				content: comment,
				author_id: author_id,
				worker_id: worker_id,
				gig_id: gig_id
			},
			$token
		);
	}

	function display_info(id: number) {
		get(`contact/${id}`, $token).then((res) => {
			alert(`Email: ${res.email} \nTelefone: ${res.phone_number}`);
		});
	}
</script>

<svelte:head>
	<title>ReadyWorker | Trabalhos Pendentes</title>
</svelte:head>

<article>
	{#if gigs.length > 0}
		{#each gigs as gig}
			<h2>{gig.description}</h2>
			Feito: {#if gig.completed} Sim {:else} Não {/if}<br />
			Aprovado: {#if gig.approved}
				Sim
				{#if role == 'hirer'}
					<button on:click={() => display_info(gig.worker_id)}>Entrar em contato</button>
				{/if}
			{:else}
				Não
			{/if} <br />
			Trabalhador:
			{#await get_worker_name(gig.worker_id)}
				...
			{:then name}
				<a href={`user/${gig.worker_id}`}>{name}</a>
			{/await}
			<br />

			{#if !gig.approved && role == 'worker'}
				<button on:click={() => approve_gig(gig.ID)}>Aprovar trabalho</button>
			{:else if role == 'hirer'}
				<button on:click={() => delete_gig(gig.ID)}>Cancelar pedido</button>
			{/if}

			{#if !gig.completed && gig.approved && role == 'worker'}
				<button on:click={() => complete_gig(gig.ID)}>Marcar como feito</button>
			{/if}

			{#if gig.completed && role == 'hirer'}
				<br />
				<form
					on:submit|preventDefault={() => {
						commentGig(gig.ID, gig.worker_id);
					}}
				>
					<textarea name="desc" maxlength="500" placeholder="Comentário" bind:value={comment} /><br
					/>
					Avalie:
					<input type="range" min="0" max="5" bind:value={rating} /><br />
					<button type="submit">Comentar</button>
				</form>
			{/if}
			<br />
		{/each}
	{:else}
		<h1>Nenhum trabalho</h1>
	{/if}
</article>
