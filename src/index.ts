/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const titleRegex = /<title>(.*?)<\/title>/;

const getHtmlTitle = async (url: string): Promise<string | undefined> => {
	const fixedUrl: string = url;
	if (!(url.startsWith('http') || url.startsWith('/'))) {
		return undefined;
	}

	const response = await fetch(fixedUrl);
	const html = await response.text();
	if (!html) {
		return undefined;
	}
	const match = titleRegex.exec(html);
	if (match && match.length >= 1) {
		return match[1];
	}
};

export default {
	async fetch(request, _env, _ctx): Promise<Response> {
		const url = URL.parse(request.url);
		try {
			if (url?.pathname.startsWith('/title')) {
				const urlParam = url?.searchParams.get('url') ?? '';
				const res = { title: await getHtmlTitle(urlParam) };
				console.log(`URL: ${urlParam}, { title: ${res.title} }`);
				return Response.json(res);
			}
		} catch (error) {
			console.error(`Error fetching title for URL: ${url}`, error);
		}
		return new Response('fail');
	},
} satisfies ExportedHandler<Env>;
