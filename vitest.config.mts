import { cloudflareTest } from '@cloudflare/vitest-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		cloudflareTest({
			config: './cloudflare.config.ts',
		}),
	],
	test: {
		globals: true,
		restoreMocks: true,
		mockReset: true,
		exclude: ['**/node_modules/**', '**/e2e/**'],
	},
});
