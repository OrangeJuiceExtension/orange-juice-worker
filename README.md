# Orange Juice Worker

A Cloudflare Worker service for talking to 3rd party websites to get around CORS restrictions.

## Development

Install dependencies with `bun install --frozen-lockfile`.

- `bun run dev` (or `bun run start`): run `cf dev` through Cloudflare's Vite plugin.
- `bun run test`: run Vitest 5 tests in the Workers runtime through `@cloudflare/vitest-plugin`.
- `bun run build`: run `cf build`, writing the Worker and assets to `.cloudflare/output/`.
- `bun run preview`: build and preview the production output locally.
- `bun run deploy`: build and deploy with `cf deploy`.
- `bun run cf-typegen`: regenerate `.cloudflare/types/index.d.ts` after configuration changes.

`cloudflare.config.ts` is the source configuration; Vite serves assets from `public/`.
Types are generated automatically on install. The project uses the `cf` CLI open beta
and its compatible Vite plugin beta.
The existing compatibility date is preserved to avoid changing runtime behavior.

CI pins Checkout v7.0.1, Cache v6.1.0, and Setup Bun v2.2.0 to immutable commit SHAs, with frozen
dependency installation, tests, and a production build on GitHub-hosted `ubuntu-latest` runners.

### Cloudflare Builds settings

`cloudflare-builds.json` owns the production and non-production build/deploy commands.
These settings are not supported in `cloudflare.config.ts` yet. After editing them,
authenticate with `bunx cf auth login` and run `bun run builds:configure` to apply
the partial update to Cloudflare. Use `bun run builds:configure --dry-run` to inspect
the request first. Committing the file alone does not update the remote settings.

Both branches build with `bun run build`. Production deploys the built output;
non-production only uploads a Worker version, without changing production traffic.
Repository connections, credentials, branch filters, and preview enablement are
left unchanged by the update. The account ID is in `cloudflare.config.ts`; the
`builds:configure` command targets this Worker's immutable script tag.

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
