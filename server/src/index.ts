import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const tasks = [
	{
		id: 1,
		description: 'Implement user authentication logic',
		createdAt: '2024-07-12T10:00:00Z',
		dueDate: '2024-07-15T23:59:59Z',
		completed: false,
	},
	{
		id: 2,
		description: 'Design database schema for tasks',
		createdAt: '2024-07-12T11:30:00Z',
		dueDate: '2024-07-14T23:59:59Z',
		completed: false,
	},
	{
		id: 3,
		description: 'Create REST API endpoints for CRUD operations',
		createdAt: '2024-07-12T13:45:00Z',
		dueDate: '2024-07-16T23:59:59Z',
		completed: true,
	},
];

app.get('/tasks', (req, res) => {
	return res.json(tasks);
});

app.listen(3000);
