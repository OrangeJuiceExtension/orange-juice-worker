import { Hono } from 'hono';

const title = new Hono();

const titleRegex = /<title\b[^>]*>(.*?)<\/title>/is;
const ogTitleRegex =
	/<meta\b(?=[^>]*\bproperty=["']og:title["'])(?=[^>]*\bcontent=["']([^"']*)["'])[^>]*\/?>/is;
const h1Regex = /<h1\b[^>]*>(.*?)<\/h1>/is;
const htmlTagRegex = /<[^>]+>/g;

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

const cleanExtractedText = (value: string): string | undefined => {
	const cleanedValue = value.replace(htmlTagRegex, '').trim();
	return cleanedValue || undefined;
};

const getFirstMatch = (html: string, regex: RegExp): string | undefined => {
	const match = regex.exec(html);
	if (!match || match.length < 2) {
		return undefined;
	}

	return cleanExtractedText(match[1]);
};

export const getTitle = (html: string): string | undefined => {
	return (
		getFirstMatch(html, titleRegex) ??
		getFirstMatch(html, ogTitleRegex) ??
		getFirstMatch(html, h1Regex)
	);
};

title.get('/', async (c) => {
	const urlParam = c.req.query('url') ?? '';
	const res = { title: await fetchPageTitle(urlParam) };
	console.log(`url: ${urlParam}, { title: ${res.title} }`);
	return c.json(res);
});

export default title;
