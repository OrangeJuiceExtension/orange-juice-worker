import { Hono } from 'hono';

const imageAcceptRe = /^image\/(jpeg|png|gif)\b/i;
const imageContentTypeRe = /^image\/(jpeg|png|gif)\b/i;
const urlParamName = 'url';

const yxorpImg = new Hono();

yxorpImg.all('/*', async (c) => {
	const method = c.req.method.toUpperCase();
	if (method !== 'GET' && method !== 'HEAD') {
		return c.text('Method Not Allowed', 405);
	}

	const accept = c.req.header('accept') ?? '';
	if (!(imageAcceptRe.test(accept) || accept.includes('image/*'))) {
		return c.text('Not Acceptable', 406);
	}

	const requestUrl = new URL(c.req.url);
	const target = requestUrl.searchParams.get(urlParamName);
	if (!target) {
		return c.text('Missing url parameter', 400);
	}

	let targetUrl: URL;
	try {
		targetUrl = new URL(target);
	} catch {
		return c.text('Invalid url parameter', 400);
	}

	if (targetUrl.protocol !== 'http:' && targetUrl.protocol !== 'https:') {
		return c.text('Invalid url protocol', 400);
	}

	console.log({ fetch: targetUrl.toString() });
	const response = await fetch(targetUrl.toString(), {
		method,
		headers: {
			Accept: accept || 'image/*',
		},
	});

	const contentType = response.headers.get('content-type') ?? '';
	if (!imageContentTypeRe.test(contentType)) {
		return c.text('Unsupported Content-Type', 415);
	}

	return response;
});

export default yxorpImg;
