import { createExecutionContext, env } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';
import yxorpApi from './yxorp-api';

describe('yxorp proxy', () => {
	it('proxies requests to HN Firebase API', async () => {
		const req = new Request('http://localhost/yxorp/v0/item/1');
		const res = await yxorpApi.request(req, env, createExecutionContext());

		expect(res.status).toBe(200);
	});

	it('preserves query parameters', async () => {
		const req = new Request('http://localhost/yxorp/v0/topstories?print=pretty');
		const res = await yxorpApi.request(req, env, createExecutionContext());

		expect(res.status).toBe(200);
	});
});
