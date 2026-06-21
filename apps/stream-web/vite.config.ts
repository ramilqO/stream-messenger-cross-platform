import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@stream/core', 'reflect-metadata', 'tsyringe']
	},
	optimizeDeps: {
		include: ['reflect-metadata', 'tsyringe', 'rxjs']
	}
});
