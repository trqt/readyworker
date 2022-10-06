import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValue = browser ? window.localStorage.getItem('token') ?? '' : '';

const token = writable<string>(initialValue);

token.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('token', value);
	}
});

export default token;
