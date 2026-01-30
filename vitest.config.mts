import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';

export default defineWorkersConfig({
	test: {
		globals: true,
		restoreMocks: true,
		mockReset: true,
		poolOptions: {
			workers: {
				wrangler: { configPath: './wrangler.jsonc' },
			},
		},
		exclude: ['**/node_modules/**', '**/e2e/**'],
	},
});
