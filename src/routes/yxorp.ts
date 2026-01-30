import { Hono } from 'hono';

const yxorp = new Hono();

yxorp.all('/*', (c) => {
	const url = new URL(c.req.url);
	const path = url.pathname.replace('/yxorp', '');
	const hParam = url.searchParams.get('h');
	url.searchParams.delete('h');
	const hnUrl = `https://hacker-news.firebaseio.com${path}${url.search || ''}`;
	console.log({ url: hnUrl, h: hParam });
	return fetch(hnUrl);
});

export default yxorp;
