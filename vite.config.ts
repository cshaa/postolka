import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import icons from 'unplugin-icons/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		icons({
			compiler: 'svelte',
			autoInstall: true
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
