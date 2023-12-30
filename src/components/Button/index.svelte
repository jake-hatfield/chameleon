<script lang="ts">
	// components
	import Spinner from '../Spinner/index.svelte';
	import Tooltip from '../Tooltip/index.svelte';

	// lib
	import { handleClickOutside } from '../../utils/click';

	// types
	import type ProgressBarRound from 'carbon-icons-svelte/lib/ProgressBarRound.svelte';

	// * required props *
	export let title: string;

	// optional props
	export let disabled = false;
	export let clickOutside: { enabled: boolean; cb: () => void } = {
		enabled: false,
		cb: () => {}
	};
	export let href: string = '';
	export let icon: typeof ProgressBarRound | null = null;
	export let iconSize = 18;
	export let isCentered = false;
	export let isFullWidth = false;
	export let isNoFollow = false;
	export let isSelected = false;
	export let isTooltipActive = false;
	export let kind: 'primary' | 'secondary' | 'tertiary' | 'ghost' = 'primary';
	export let loading = false;
	export let onClick = () => {};
	export let onMouseEnter = () => {};
	export let onMouseLeave = () => {};
	export let selectedClasses = 'header-link-active';
	export let size: 'sm' | 'md' | 'lg' | 'field' = 'md';
	export let spaceIconBetween = false;
	export let tooltipAlignment: 'start' | 'center' | 'end' = 'center';
	export let tooltipPosition: 'top' | 'bottom' = 'bottom';
	export let type: 'icon' | 'full' = 'full';

	if (type === 'icon' && !icon) throw new Error('An icon is required');

	// state
	const commonLayoutClasses = `flex items-center ${
		isCentered || type === 'icon'
			? 'justify-center'
			: spaceIconBetween
			? 'justify-between'
			: 'justify-center md:justify-start'
	} ${isFullWidth ? 'w-full' : 'w-fit'} ${
		size === 'sm'
			? 'py-1 px-1.5'
			: size === 'md'
			? type === 'icon'
				? 'py-[11px] px-3'
				: 'py-2.5 px-3'
			: size === 'lg'
			? 'p-3'
			: 'pt-[9px] pb-[9px] px-3 border-b border-transparent'
	}`;
	const commonTypographyClasses = `${
		size === 'lg' ? 'text-base' : 'text-sm'
	} tracking-wide font-semibold`;
	const commonStyleClasses = `${
		kind === 'primary'
			? 'bg-rose-600 text-white hover:bg-rose-700'
			: kind === 'secondary'
			? 'bg-cyan-400 text-zinc-900 hover:bg-cyan-500'
			: kind === 'tertiary'
			? 'bg-zinc-700 text-white hover:bg-zinc-600'
			: 'hover:bg-zinc-800 hover:text-cyan-400'
	} ring-1 ring-transparent ring-inset focus:outline-none focus:ring-white transition-colors duration-150`;

	const commonIconSize = iconSize ? iconSize : size === 'sm' || size === 'field' ? 16 : 20;

	$: isInactive = loading || disabled;
</script>

<div class="relative inline" use:handleClickOutside={clickOutside}>
	{#if href}
		<a
			aria-label={type === 'icon' ? title : ''}
			{href}
			on:mouseenter={() => {
				isTooltipActive = true;
				onMouseEnter();
			}}
			on:mouseleave={() => {
				isTooltipActive = false;
				onMouseLeave();
			}}
			on:click={() => {
				isTooltipActive = false;
				onClick && onClick();
			}}
			class={`${commonLayoutClasses} ${commonTypographyClasses} ${
				isInactive ? 'cursor-not-allowed bg-zinc-800 text-zinc-500' : commonStyleClasses
			} ${isSelected && !isInactive ? selectedClasses : ''} ${$$props.class ? $$props.class : ''}`}
			rel={isNoFollow ? 'nofollow' : null}
		>
			{#if type !== 'icon'}
				{#if loading}
					<Spinner />
				{/if}
				<span
					class={`whitespace-nowrap ${loading ? 'ml-1.5 md:ml-2' : ''} ${icon ? 'mr-1.5' : ''}`}
				>
					{title}
				</span>
			{/if}
			{#if icon}
				<svelte:component this={icon} class="flex-none" size={commonIconSize} />
			{/if}
		</a>
	{:else}
		<button
			aria-label={type === 'icon' ? title : ''}
			on:click={(e) => {
				isTooltipActive = false;
				onClick();
			}}
			on:mouseenter={() => {
				isTooltipActive = true;
				onMouseEnter();
			}}
			on:mouseleave={() => {
				isTooltipActive = false;
				onMouseLeave();
			}}
			class={`${commonLayoutClasses} ${commonTypographyClasses} ${
				isInactive ? 'cursor-not-allowed bg-zinc-800 text-zinc-500' : commonStyleClasses
			} ${isSelected && !isInactive ? selectedClasses : ''} ${$$props.class ? $$props.class : ''}`}
			disabled={isInactive}
			{...$$props.rest}
		>
			{#if type !== 'icon'}
				{#if loading}
					<Spinner />
				{/if}
				<span
					class={`whitespace-nowrap ${loading ? 'ml-1.5 md:ml-2' : ''} ${icon ? 'mr-1.5' : ''}`}
				>
					{title}
				</span>
			{/if}
			{#if icon}
				{#if loading && type === 'icon'}
					<Spinner />
				{:else}
					<svelte:component this={icon} class="flex-none" size={commonIconSize} />
				{/if}
			{/if}
		</button>
	{/if}
	{#if isTooltipActive && type === 'icon'}
		<Tooltip alignment={tooltipAlignment} position={tooltipPosition} {size} {title} />
	{/if}
</div>
