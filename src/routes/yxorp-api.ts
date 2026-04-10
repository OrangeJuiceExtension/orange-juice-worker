import { Hono } from 'hono';

const yxorpCacheTtlSeconds = 60 * 60;
const yxorpPrefixRe = /^\/yxorp[^/]*\/?/;

const yxorpImg = new Hono();

yxorpImg.all('/*', (c) => {
	const url = new URL(c.req.url);
	const path = url.pathname.replace(yxorpPrefixRe, '/');
	const hParam = url.searchParams.get('h');
	url.searchParams.delete('h');
	const hnUrl = `https://hacker-news.firebaseio.com${path}${url.search || ''}`;
	console.log({ url: hnUrl, h: hParam });
	return fetch(hnUrl, {
		cf: {
			cacheTtl: yxorpCacheTtlSeconds,
		},
	});
});

export default yxorpImg;
