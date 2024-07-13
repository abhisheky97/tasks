import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import z from 'zod';

export const taskRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

const createTaskInput = z.object({
	description: z.string(),
	dueDate: z.string().transform((val) => new Date(val)),
});

taskRouter.use('/*', async (c, next) => {
	try {
		c.set('userId', '3');
		await next();
	} catch (e) {
		console.error(e);
	}
});

taskRouter.get('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	try {
		const tasks = await prisma.task.findMany();
		return c.json({ tasks });
	} catch (error) {
		console.error(error);
		c.status(500);
		return c.json({
			error: 'Internal Server Error',
		});
	} finally {
		await prisma.$disconnect();
	}
});

taskRouter.post('/', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	try {
		const body = await c.req.json();
		const result = createTaskInput.safeParse(body);
		console.log(result);

		if (!result.success) {
			c.status(400);
			return c.json({
				message: 'Inputs not correct',
			});
		}
		const { data } = result;
		const userId = c.get('userId');
		if (!userId) {
			c.status(401);
			return c.json({
				error: 'Unauthorized',
			});
		}

		const task = await prisma.task.create({
			data: {
				description: data.description,
				dueDate: data.dueDate,
				userId: Number(userId),
				createdAt: new Date(),
			},
		});
		return c.json({
			id: task.id,
		});
	} catch (error) {
		console.error(error);
		c.status(500);
		return c.json({
			error: 'Internal Server Error',
		});
	} finally {
		await prisma.$disconnect();
	}
});
