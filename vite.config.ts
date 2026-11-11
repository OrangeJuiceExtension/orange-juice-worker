import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
	publicDir: './public',
	plugins: [cloudflare()],
});
