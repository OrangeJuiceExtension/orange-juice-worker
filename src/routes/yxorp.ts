import { Hono } from 'hono';

const yxorp = new Hono();

yxorp.all('/*', (c) => {
	const url = new URL(c.req.url);
	const path = url.pathname.replace('/yxorp', '');
	const hnUrl = `https://hacker-news.firebaseio.com${path}${url.search || ''}`;
	console.log(`url: ${hnUrl}`);
	return fetch(hnUrl);
});

export default yxorp;
