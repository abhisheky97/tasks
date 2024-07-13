import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { format } from 'date-fns';

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
	return (
		<Card>
			<CardHeader>
				<CardTitle>{task.id}</CardTitle>
				<CardDescription>{task.description}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>Created At: {formattedCreatedAt}</p>
				<p>Due Date: {formattedDueDate}</p>
			</CardContent>
			<CardFooter>
				<p>Completed: {task.completed ? 'Yes' : 'No'}</p>
			</CardFooter>
		</Card>
	);
};

export default Task;
