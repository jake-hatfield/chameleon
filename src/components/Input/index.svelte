<script lang="ts">
	// svelte
	import { fade } from 'svelte/transition';

	// components
	import Button from '../Button/index.svelte';

	// icons
	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import ErrorFilled from 'carbon-icons-svelte/lib/ErrorFilled.svelte';
	import Subtract from 'carbon-icons-svelte/lib/Subtract.svelte';
	import ViewFilled from 'carbon-icons-svelte/lib/ViewFilled.svelte';
	import ViewOffFilled from 'carbon-icons-svelte/lib/ViewOffFilled.svelte';

	// types
	type HTMLInputTypes =
		| 'button'
		| 'color'
		| 'date'
		| 'datetime-local'
		| 'email'
		| 'file'
		| 'hidden'
		| 'image'
		| 'month'
		| 'number'
		| 'password'
		| 'range'
		| 'reset'
		| 'search'
		| 'submit'
		| 'tel'
		| 'text'
		| 'time'
		| 'url'
		| 'week';

	// * required props *
	export let id: string;
	export let type: HTMLInputTypes;
	export let placeholder: string;
	// optional props
	export let hasInlineButton = false;
	export let hasIncrementDecrement = false;
	export let error = '';
	export let helperText = '';
	export let isLabelHidden = false;
	export let isPassword = false;
	export let isRequired = false;
	export let isReadOnly = false;
	export let showPasswordText = false;
	export let label = '';
	export let max = 0;
	export let min = 0;
	export let onChange = (e: any) => {};
	export let onInput = (e: any) => {};
	export let units = '';
	export let value: string | number = '';

	// state
	if (type === 'number' && !min && !max) throw new Error('Min and max values must be included');

	//   functions
	const handleChange = (e: any) => {
		let target = e.target as HTMLInputElement;

		onChange(e);
	};

	const handleInput = (e: any) => {
		let target = e.target as HTMLInputElement;

		if (!validateInput(target)) return;

		// update the value
		value = target.value;
		onInput(e);
	};

	const validateInput = (target: HTMLInputElement) => {
		if (type === 'number') {
			if (!validateNumberInput(target)) return false;
		}

		return true;
	};

	const validateNumberInput = (target: HTMLInputElement) => {
		if (+target.value < min) {
			target.value = min.toString();
			value = min;
			return false;
		}

		if (+target.value > max) {
			target.value = max.toString();
			value = max;
			return false;
		}

		return true;
	};

	const toggleShowPasswordText = () => {
		showPasswordText = !showPasswordText;
		type = showPasswordText ? 'text' : 'password';
	};
</script>

<div class={`relative w-full ${$$props.class ? $$props.class : ''}`} data-testId="input-container">
	{#if label}
		<label
			for={id}
			class={`block font-medium text-zinc-300 ${isLabelHidden ? 'sr-only' : ''} ${
				isReadOnly ? 'cursor-not-allowed text-zinc-500' : 'cursor-text'
			}`}
		>
			{label}
			{isRequired ? '*' : ''}
		</label>
	{/if}
	<div class={`${label ? 'mt-1.5' : ''} relative flex`}>
		{#if type === 'number' && hasIncrementDecrement}
			<div class={`absolute ${error ? 'right-10' : 'right-0'} top-1 flex items-center`}>
				<Button
					disabled={+value <= min}
					icon={Subtract}
					kind="ghost"
					level={1}
					onClick={() => (value = +value - 1).toString()}
					size="sm"
					title="Subtract"
					type="icon"
				/>
				<Button
					class="ml-0.5"
					disabled={+value >= max}
					icon={Add}
					kind="ghost"
					level={1}
					onClick={() => (value = +value + 1).toString()}
					size="sm"
					title="Add"
					tooltipAlignment="end"
					type="icon"
				/>
			</div>
		{/if}
		{#if units}
			<span
				class="flex w-10 flex-none items-center justify-center bg-zinc-700 px-3 pt-[8px] pb-[7px]"
			>
				{units}
			</span>
		{/if}
		<input
			autocomplete="off"
			class={`block w-full border-b-2 bg-zinc-800 py-1.5 pr-3 pl-3 md:py-2 ${
				type === 'number' && !hasIncrementDecrement ? '' : 'md:pr-10'
			} ${
				error
					? 'placeholder:red-300 border-red-300 text-red-400 focus:border-red-500 focus:ring-red-500'
					: isReadOnly
					? 'cursor-not-allowed border-zinc-700 text-zinc-500'
					: 'cursor-text border-zinc-700 text-zinc-300 focus:border-white focus:ring-white'
			} mono placeholder:zinc-500 placeholder:text-xs focus:outline-none sm:text-sm md:placeholder:text-sm`}
			disabled={isReadOnly}
			{id}
			on:change={handleChange}
			on:input={handleInput}
			min={type === 'number' ? min : null}
			max={type === 'number' ? max : null}
			name={id}
			{placeholder}
			required={isRequired}
			{type}
			{value}
		/>
		{#if error}
			<div
				class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-red-300"
			>
				<ErrorFilled />
			</div>
		{/if}
		{#if isPassword && value}
			<button
				on:click|preventDefault={toggleShowPasswordText}
				transition:fade={{ duration: 150 }}
				class={`absolute inset-y-0 ${
					error ? 'right-10' : 'right-2.5'
				} text-zinc-300 transition duration-150`}
				data-testId={showPasswordText ? 'hide-password-text' : 'show-password-text'}
			>
				{#if showPasswordText}
					<ViewOffFilled size={24} />
				{:else}
					<ViewFilled size={24} />
				{/if}
			</button>
		{/if}
		{#if hasInlineButton}
			<slot />
		{/if}
	</div>
	{#if error || isReadOnly || helperText}
		<div class="mt-1.5 text-left text-xs md:text-sm">
			{#if error}
				<p class="text-red-400" id={`${id}-error`}>
					{error}
				</p>
			{:else if isReadOnly}
				<p class="text-zinc-500" id={`${id}-read-only`}>This field is not editable</p>
			{:else if helperText}
				<p class="text-zinc-300" id={`${id}-helper-text`}>
					{helperText}
				</p>
			{/if}
		</div>
	{/if}
</div>
