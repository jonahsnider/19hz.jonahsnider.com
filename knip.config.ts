import type { KnipConfig } from 'knip';

const config: KnipConfig = {
	// Preserve the exports of copied shadcn/ui components.
	ignore: ['src/components/ui/**'],
	ignoreDependencies: [
		// @sentry/astro loads this dynamically when using the Cloudflare adapter.
		'@sentry/cloudflare',
	],
};

export default config;
