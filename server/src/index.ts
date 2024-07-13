import { Hono } from 'hono';
import { userRouter, taskRouter } from './routes';
import { cors } from 'hono/cors';

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string;
	};
}>();

app.use('/*', cors());
app.route('/api/v1/users', userRouter);
app.route('/api/v1/tasks', taskRouter);

export default app;
