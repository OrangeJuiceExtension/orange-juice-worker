import { createExecutionContext, env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import envProbe, { keyNames } from './env-probe';

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

describe('env probe', () => {
	it('responds with an API_KEY file for .env probes', async () => {
		const req = new Request('http://localhost/.env');
		const res = await envProbe.request(req, env, createExecutionContext());
		const body = await res.text();
		const lines = body.trim().split('\n').filter(Boolean);

		expect(res.status).toBe(200);
		expect(lines.length).toBeGreaterThanOrEqual(4);
		expect(lines.length).toBeLessThanOrEqual(keyNames.length);

		const seen = new Set<string>();
		for (const line of lines) {
			const [key, value] = line.split('=');
			expect(keyNames.includes(key)).toBe(true);
			expect(uuidRe.test(value)).toBe(true);
			expect(seen.has(key)).toBe(false);
			seen.add(key);
		}
	});

	it('responds for nested .env probes', async () => {
		const req = new Request('http://localhost/awstats/.env');
		const res = await envProbe.request(req, env, createExecutionContext());
		const body = await res.text();
		const lines = body.trim().split('\n').filter(Boolean);

		expect(res.status).toBe(200);
		expect(lines.length).toBeGreaterThanOrEqual(4);
		expect(lines.length).toBeLessThanOrEqual(keyNames.length);
	});

	it('responds for .env.* probes', async () => {
		const req = new Request('http://localhost/foo/.env.production');
		const res = await envProbe.request(req, env, createExecutionContext());
		const body = await res.text();
		const lines = body.trim().split('\n').filter(Boolean);

		expect(res.status).toBe(200);
		expect(lines.length).toBeGreaterThanOrEqual(4);
		expect(lines.length).toBeLessThanOrEqual(9);
	});
});
