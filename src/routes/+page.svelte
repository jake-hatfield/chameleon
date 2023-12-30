<script lang="ts">
	// packages
	import axios from 'axios';

	// components
	import Button from '../components/Button/index.svelte';
	import Input from '../components/Input/index.svelte';

	// utils
	import { intercept } from '../utils/api';

	// state
	let request = 'https://jsonplaceholder.typicode.com/todos/1';
	let overrideRequest = 'https://jsonplaceholder.typicode.com/todos/99';

	// functions
	const handleRequestOverride = async () => {
		intercept(overrideRequest);

		const jsonPlaceholderResponse = await axios.get(request);
	};
</script>

<section class="p-4">
	<header>
		<h1 class="text-lime-400">Hello, world</h1>
	</header>
	<div class="mt-8">
		<Input id="request" placeholder="Request" type="text" bind:value={request} />
		<Input
			class="mt-3"
			id="override-request"
			placeholder="Override with..."
			type="text"
			bind:value={overrideRequest}
		/>
		<Button class="mt-3" onClick={handleRequestOverride} title="Submit" />
	</div>
</section>
