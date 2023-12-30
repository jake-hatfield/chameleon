<script lang="ts">
	// svelte
	import { fly } from 'svelte/transition';

	// * required props *
	export let title: string;

	// optional props
	export let alignment: 'start' | 'center' | 'end' = 'center';
	export let position: 'top' | 'bottom' = 'bottom';
	export let size: 'sm' | 'md' | 'lg' | 'field' = 'md';
</script>

<span
	aria-hidden="true"
	aria-expanded="true"
	class={`absolute min-w-fit w-full ${
		alignment === 'start'
			? 'left-0'
			: alignment === 'center'
			? 'left-1/2 transform -translate-x-1/2 text-center'
			: 'right-0'
	} ${
		position === 'top'
			? size === 'sm'
				? 'bottom-10'
				: 'bottom-14'
			: size === 'sm'
			? 'top-10'
			: 'top-14'
	} z-10 py-1.5 px-3 bg-zinc-800 text-sm`}
	transition:fly|local
>
	<div class="relative text-zinc-800">
		<svg
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			fill="currentColor"
			class={`absolute -top-[17px] ${
				alignment === 'start'
					? size === 'sm' || size === 'field'
						? '-left-1'
						: 'left-0'
					: alignment === 'center'
					? 'left-1/2 transform -translate-x-1/2'
					: size === 'sm' || size === 'field'
					? '-right-1'
					: 'right-0'
			}`}
			viewBox="0 0 16 16"
		>
			<path
				d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
			/>
		</svg>
	</div>

	<span class="whitespace-nowrap text-white">
		{title}
	</span>
</span>
