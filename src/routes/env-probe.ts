import type { Context } from 'hono';
import { Hono } from 'hono';

const envProbePathRe =
	/(^|\/)(\.env(\.[A-Za-z0-9._-]+)?|aws\.env|awsconfig\.js|wp-config\.aws)$/i;

const envProbe = new Hono();

export const keyNames = [
	'API_KEY',
	'AWS_ACCESS_KEY_ID',
	'AWS_SECRET_ACCESS_KEY',
	'DATABASE_URL',
	'REDIS_URL',
	'JWT_SECRET',
	'SENTRY_DSN',
	'STRIPE_SECRET_KEY',
	'GITHUB_TOKEN',
	'GOOGLE_API_KEY',
	'OPENAI_API_KEY',
	'SLACK_BOT_TOKEN',
	'MAILGUN_API_KEY',
	'POSTMARK_SERVER_TOKEN',
	'FIREBASE_API_KEY',
	'ALGOLIA_API_KEY',
	'TWILIO_AUTH_TOKEN',
];

const apiKeyResponse = (c: Context) => {
	const total = keyNames.length;
	const minKeys = 4;
	const maxKeys = 9;
	const count = Math.min(total, Math.floor(Math.random() * (maxKeys - minKeys + 1)) + minKeys);
	const selected = new Set<number>();

	while (selected.size < count) {
		selected.add(Math.floor(Math.random() * total));
	}

	const lines = Array.from(selected, (index) => `${keyNames[index]}=${crypto.randomUUID()}`);
	return c.text(`${lines.join('\n')}\n`);
};

const envProbePaths = [
	'/.env',
	'/.env.:suffix',
	'/.env/:suffix',
	'/:dir/.env',
	'/:dir/.env.:suffix',
	'/:dir/.env/:suffix',
	'/aws.env',
	'/awsconfig.js',
	'/wp-config.aws',
];

for (const path of envProbePaths) {
	envProbe.on(['GET', 'HEAD'], path, apiKeyResponse);
}

envProbe.on(['GET', 'HEAD'], '/*', (c) => {
	const path = new URL(c.req.url).pathname;
	if (!envProbePathRe.test(path)) {
		return c.notFound();
	}

	return apiKeyResponse(c);
});

export default envProbe;
