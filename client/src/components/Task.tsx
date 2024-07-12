import React from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

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
	return (
		<Card>
			<CardHeader>
				<CardTitle>{task.id}</CardTitle>
				<CardDescription>{task.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Created At: {task.createdAt}</p>
				<p>Due Date: {task.dueDate}</p>
			</CardContent>
			<CardFooter>
				<p>Completed: {task.completed ? 'Yes' : 'No'}</p>
			</CardFooter>
		</Card>
	);
};

export default Task;
