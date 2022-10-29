<script lang="ts">
	import type { PageData } from './$types';
	import { get } from '$lib/api';
	import token from '$lib/stores/token';
	import { browser } from '$app/environment';
	let users: any[] = [];

	if ($token == '') {
		if (browser) {
			window.location.href = '/login';
		}
	}

	export let data: PageData;

	get(`category/${data.slug}`, $token).then((res) => {
		if (res.error) {
			if (browser) {
				window.location.href = '/login';
			}
		}

		users = res;
	});

	$: console.log(users);
</script>

{#each users as user}
	<h3>
		{user.name}
	</h3>
	<div>{user.description}</div>
	<br />
{/each}
