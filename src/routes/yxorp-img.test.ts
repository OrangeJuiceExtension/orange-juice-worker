import { createExecutionContext, env } from 'cloudflare:test';
import { describe, expect, it, vi } from 'vitest';
import yxorpImg from './yxorp-img';

const imageUrl = 'https://example.com/image.png';

describe('yxorp img proxy', () => {
	it('rejects non-image Accept headers', async () => {
		const req = new Request(`http://localhost/yxorp-img/?url=${encodeURIComponent(imageUrl)}`, {
			headers: { Accept: 'text/html' },
		});

		const res = await yxorpImg.request(req, env, createExecutionContext());

		expect(res.status).toBe(406);
	});

	it('proxies images and validates content type', async () => {
		const fetchSpy = vi.fn(() => {
			return new Response('image-bytes', {
				status: 200,
				headers: { 'content-type': 'image/png' },
			});
		});
		vi.stubGlobal('fetch', fetchSpy);

		const req = new Request(`http://localhost/yxorp-img/?url=${encodeURIComponent(imageUrl)}`, {
			headers: { Accept: 'image/png' },
		});

		const res = await yxorpImg.request(req, env, createExecutionContext());

		expect(res.status).toBe(200);
		expect(fetchSpy).toHaveBeenCalledWith(imageUrl, expect.any(Object));
	});

	it('rejects non-image responses', async () => {
		const fetchSpy = vi.fn(() => {
			return new Response('not-image', {
				status: 200,
				headers: { 'content-type': 'text/html' },
			});
		});
		vi.stubGlobal('fetch', fetchSpy);

		const req = new Request(`http://localhost/yxorp-img/?url=${encodeURIComponent(imageUrl)}`, {
			headers: { Accept: 'image/*' },
		});

		const res = await yxorpImg.request(req, env, createExecutionContext());

		expect(res.status).toBe(415);
	});
});
