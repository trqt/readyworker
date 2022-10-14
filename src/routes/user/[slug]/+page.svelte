<script lang="ts">
	import type { PageData } from './$types';
	import { get } from '$lib/api';
	import token from '$lib/stores/token';
	let user = { name: '...', description: '...' };
	let comments: any[] = [];

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
		console.log(res);
		console.log(author);
		return author;
	}

	$: console.log(user);
	$: console.log(comments);
</script>

<div>{user.name}</div>
<div>{user.description}</div>
<h2>Comentários</h2>
{#each comments as comment}
	<h3>
		Autor: {#await author(comment.author_id) then author_name}
			{author_name}
		{/await}
	</h3>
	<div>{comment.content}</div>
	<br />
{/each}
