import { browser } from '$app/environment';

import { writable } from 'svelte/store';

const initialValue = browser ? window.localStorage.getItem('userid') ?? '0' : '0';

const token = writable<string>(initialValue);

token.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('userid', value);
	}
});

export default token;
