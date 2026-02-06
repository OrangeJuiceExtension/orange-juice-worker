import { Hono } from 'hono';
import { cors } from 'hono/cors';
import envProbe from './routes/env-probe';
import favicon from './routes/favicon';
import title from './routes/title';
import yxorpApi from './routes/yxorp-api';

const app = new Hono();

app.use('/*', cors({ origin: 'https://news.ycombinator.com' }));

app.route('/title', title);

// legacy /yxorp remove after a while and use the -api version
app.route('/yxorp', yxorpApi);
app.route('/yxorp-api', yxorpApi);

app.route('/favicon.ico', favicon);

app.route('/', envProbe);

export default app;
