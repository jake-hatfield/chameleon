// packages
import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from 'sveltekit-adapter-chrome-extension';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		appDir: 'app'
	}
};

export default config;
