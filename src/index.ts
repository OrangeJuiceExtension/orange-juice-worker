import { Hono } from 'hono';
import title from './routes/title';
import yxorp from './routes/yxorp';
import favicon from './routes/favicon';

const app = new Hono();

app.route('/title', title);
app.route('/yxorp', yxorp);
app.route('/favicon.ico', favicon);

export default app;
