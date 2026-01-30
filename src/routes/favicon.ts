import { Hono } from 'hono';

const faviconRoute = new Hono();

// Base64 encoded favicon or just return 204 No Content
faviconRoute.get('/', (c) => {
	return c.body(null, 204);
});

export default faviconRoute;
