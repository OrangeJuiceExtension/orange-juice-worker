const titleRegex = /<title>(.*?)<\/title>/is;

export const getTitle = (html: string): string | undefined => {
	const match = titleRegex.exec(html);
	if (match && match.length >= 1) {
		return match[1].trim();
	}
	return undefined;
};

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

export default {
	async fetch(
		request: Request<unknown, IncomingRequestCfProperties>,
		_env,
		_ctx
	): Promise<Response> {
		const url = URL.parse(request.url);
		try {
			if (url?.pathname.startsWith('/title')) {
				const urlParam = url?.searchParams.get('url') ?? '';
				const res = { title: await fetchPageTitle(urlParam) };
				console.log(`URL: ${urlParam}, { title: ${res.title} }`);
				return Response.json(res);
			}
		} catch (error) {
			console.error(`Error fetching title for URL: ${url}`, error);
		}
		return Response.json({ error: 'fail' });
	},
} satisfies ExportedHandler<Env>;
