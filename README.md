# Orange Juice Worker

A Cloudflare Worker service for talking to 3rd party websites to get around CORS restrictions.

## Development

Install dependencies with `bun install --frozen-lockfile`.

- `bun run dev` (or `bun run start`): run locally through Cloudflare's Vite plugin.
- `bun run test`: run Vitest 5 tests in the Workers runtime through `@cloudflare/vitest-plugin`.
- `bun run build`: build the Worker and static assets into `dist/`.
- `bun run preview`: build and preview the production output locally.
- `bun run deploy`: build, then deploy the generated Worker with Wrangler.
- `bun run cf-typegen`: regenerate `worker-configuration.d.ts` after binding or Wrangler changes.

The Vite plugin generates `.wrangler/deploy/config.json`, which directs Wrangler to
the built configuration. Keep `wrangler.jsonc` as the source configuration.
The existing compatibility date is preserved to avoid changing runtime behavior.

CI pins Checkout v7.0.1, Cache v6.1.0, and Setup Bun v2.2.0 to immutable commit SHAs, with frozen
dependency installation, tests, and a production build. The Tenki runner must
provide Actions Runner 2.327.1 or newer for the Node.js 24 actions.

# Endpoints

## GET /title

Extracts the title tag content from a given URL.

**Query Parameters:**
- `url` - The URL to fetch and extract the title from

**Example:**
```
GET /title?url=https://example.com
```

**Response:**
```json
{
  "title": "Example Domain"
}
```

## GET /yxorp

Proxies requests to the Firebase API so that we can remove a host permission. 

**Example:**
```
GET /yxorp/v0/updates.json?print=pretty
```

**Response:**
```json
{"foo":  "bar"}
```

### Future Enhancements

AI could be used to generate more descriptive titles when the original title tag is missing or inadequate.
