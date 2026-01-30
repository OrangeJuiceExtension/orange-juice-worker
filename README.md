# Orange Juice Worker

A Cloudflare Worker service for talking to 3rd party websites to get around CORS restrictions.

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
