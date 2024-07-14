import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../state/store';
import {
	fetchTasks,
	selectError,
	selectLoading,
	selectTasks,
} from '../state/tasks/tasksSlice';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';

import { Input } from './ui/input';
import { Button } from './ui/button';

import Task from './Task';
import AddTask from './AddTask';

const Tasks = () => {
	const dispatch = useDispatch<AppDispatch>();
	const tasks = useSelector(selectTasks);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);

	const [searchQuery, setSearchQuery] = useState('');
	const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
	const [selectedFilter, setSelectedFilter] = useState<string>('Default');

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	useEffect(() => {
		filterTasks(selectedFilter);
	}, [tasks, selectedFilter]);

	const handleSearch = () => {
		const filtered = tasks.filter((task) =>
			task.description.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredTasks(filtered);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleFilterChange = (value: string) => {
		setSelectedFilter(value);
	};

	const filterTasks = (filter: string) => {
		let filtered: any[] = [];

		switch (filter) {
			case 'Completed':
				filtered = tasks.filter((task) => task.completed);
				break;
			case 'Due Today': {
				const today = new Date().toISOString().split('T')[0];
				filtered = tasks.filter(
					(task) => task.dueDate?.split('T')[0] === today
				);
				break;
			}
			case 'Not Completed':
				filtered = tasks.filter((task) => !task.completed);
				break;
			default:
				filtered = tasks;
				break;
		}

		setFilteredTasks(filtered);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<div className='flex flex-row items-start gap-5 border border-white p-3'>
				<div className='flex w-full max-w-md items-center space-x-2'>
					<Input
						type='search'
						placeholder='Search'
						className='bg-slate-900 text-white'
						value={searchQuery}
						onChange={handleChange}
					/>
					<Button
						type='button'
						onClick={handleSearch}
						className='bg-white text-black'>
						Search
					</Button>
				</div>
				<div>
					<Select
						value={selectedFilter}
						onValueChange={handleFilterChange}>
						<SelectTrigger className='w-[140px] bg-slate-900'>
							<SelectValue className='text-white'>
								{selectedFilter === 'Default'
									? 'Select Filter'
									: selectedFilter}
							</SelectValue>
						</SelectTrigger>
						<SelectContent className='bg-slate-800 text-white'>
							<SelectItem
								value='Default'
								className='hover:bg-slate-700 hover:text-white'>
								Clear Filter
							</SelectItem>
							<SelectItem
								value='Completed'
								className='hover:bg-slate-700 hover:text-white'>
								Completed
							</SelectItem>
							<SelectItem
								value='Due Today'
								className='hover:bg-slate-700 hover:text-white'>
								Due Today
							</SelectItem>
							<SelectItem
								value='Not Completed'
								className='hover:bg-slate-700 hover:text-white'>
								Not Completed
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<AddTask />
				</div>
			</div>
			<div>
				<div className='flex flex-col gap-4 mt-8'>
					{filteredTasks.map((task) => (
						<Task
							key={task.id}
							task={task}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Tasks;
