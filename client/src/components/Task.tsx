import * as React from 'react';
import { format } from 'date-fns';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { Checkbox } from './ui/checkbox';

interface TaskProps {
	task: {
		id: number;
		description: string;
		createdAt: string;
		dueDate: string;
		completed: boolean;
	};
}

const Task: React.FC<TaskProps> = ({ task }) => {
	const formattedCreatedAt = format(
		new Date(task.createdAt),
		'MMM dd, yyyy HH:mm'
	);
	const formattedDueDate = format(new Date(task.dueDate), 'MMM dd, yyyy');

	const handleToggleCompleted = () => {
		console.log(`Task: ${task.description} marked as completed`);
	};

	return (
		<Card className='bg-slate-800'>
			<CardHeader>
				<CardTitle>{task.description}</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Created At: {formattedCreatedAt}</p>
				<p>Due Date: {formattedDueDate}</p>
			</CardContent>
			<CardFooter>
				<p>Completed: {task.completed ? 'Yes' : 'No'} </p>
				<Checkbox
					checked={task.completed}
					className='ml-4'
					onCheckedChange={handleToggleCompleted}
				/>
			</CardFooter>
		</Card>
	);
};

export default Task;
