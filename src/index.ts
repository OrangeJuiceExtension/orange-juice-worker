import { Hono } from 'hono';
import title from './routes/title';
import yxorp from './routes/yxorp';

const app = new Hono();

app.route('/title', title);
app.route('/yxorp', yxorp);

export default app;
