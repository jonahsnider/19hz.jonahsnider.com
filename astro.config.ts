import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sentry from '@sentry/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
	adapter: cloudflare({ imageService: 'passthrough' }),
	integrations: [
		sentry({
			org: 'jonah-snider',
			project: '19hz',
		}),
		react(),
	],
	session: false,
	vite: {
		optimizeDeps: {
			include: ['@sentry/astro', '@sentry/astro/middleware', 'cheerio', 'chrono-node'],
			exclude: ['astro/assets/services/noop'],
		},
		plugins: [tailwindcss()],
	},
});
