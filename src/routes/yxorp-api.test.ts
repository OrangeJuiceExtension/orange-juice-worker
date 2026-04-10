import { createExecutionContext, env } from 'cloudflare:test';
import { afterEach, describe, expect, it, vi } from 'vitest';
import yxorpApi from './yxorp-api';

afterEach(() => {
	vi.restoreAllMocks();
});

describe('yxorp proxy', () => {
	it('proxies requests to HN Firebase API with edge caching', async () => {
		const fetchSpy = vi
			.spyOn(globalThis, 'fetch')
			.mockResolvedValue(new Response('{}', { status: 200 }));
		const req = new Request('http://localhost/yxorp/v0/item/1');
		const res = await yxorpApi.request(req, env, createExecutionContext());

		expect(res.status).toBe(200);
		expect(fetchSpy).toHaveBeenCalledWith('https://hacker-news.firebaseio.com/v0/item/1', {
			cf: { cacheTtl: 3600 },
		});
	});

	it('preserves query parameters and strips the h parameter', async () => {
		const fetchSpy = vi
			.spyOn(globalThis, 'fetch')
			.mockResolvedValue(new Response('{}', { status: 200 }));
		const req = new Request('http://localhost/yxorp/v0/topstories?print=pretty&h=123');
		const res = await yxorpApi.request(req, env, createExecutionContext());

		expect(res.status).toBe(200);
		expect(fetchSpy).toHaveBeenCalledWith(
			'https://hacker-news.firebaseio.com/v0/topstories?print=pretty',
			{
				cf: { cacheTtl: 3600 },
			}
		);
	});
});
