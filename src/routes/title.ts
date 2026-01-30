import { Hono } from 'hono';

const title = new Hono();

const titleRegex = /<title>(.*?)<\/title>/is;

export const fetchPageTitle = async (url: string): Promise<string | undefined> => {
	const fixedUrl: string = url;
	if (!(url.startsWith('http') || url.startsWith('/'))) {
		throw new Error('Invalid URL format');
	}

	const response = await fetch(fixedUrl);
	const html = await response.text();
	if (!html.length) {
		throw new Error('fetch returned no data');
	}
	return getTitle(html);
};

export const getTitle = (html: string): string | undefined => {
	const match = titleRegex.exec(html);
	if (match && match.length >= 1) {
		return match[1].trim();
	}
	return undefined;
};

title.get('/', async (c) => {
	const urlParam = c.req.query('url') ?? '';
	const res = { title: await fetchPageTitle(urlParam) };
	console.log(`url: ${urlParam}, { title: ${res.title} }`);
	return c.json(res);
});

export default title;
