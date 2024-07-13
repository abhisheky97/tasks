import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { API_URL } from '../../config';

interface Task {
	id: number;
	description: string;
	createdAt: string;
	dueDate: string;
	completed: boolean;
}

interface TasksResponse {
	tasks: Task[];
}

interface TasksState {
	tasks: Task[];
	loading: boolean;
	error: string | null;
}

const initialState: TasksState = {
	tasks: [],
	loading: false,
	error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
	const response = await axios.get<TasksResponse>(`${API_URL}/api/v1/tasks`);
	return response.data.tasks;
});

export const addTask = createAsyncThunk(
	'tasks/addTask',
	async (newTask: Omit<Task, 'id'>) => {
		const response = await axios.post<Task>(`${API_URL}/api/v1/tasks`, newTask);
		return response.data;
	}
);

export const updateTask = createAsyncThunk(
	'tasks/updateTask',
	async (updatedTask: Task) => {
		const { id, ...rest } = updatedTask;
		const response = await axios.put<Task>(
			`${API_URL}/api/v1/tasks/${id}`,
			rest
		);
		return response.data;
	}
);

export const deleteTask = createAsyncThunk(
	'tasks/deleteTask',
	async (taskId: number) => {
		await axios.delete(`${API_URL}/api/v1/tasks/${taskId}`);
		return taskId;
	}
);

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to fetch todos';
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.tasks.push(action.payload);
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const updatedTask = action.payload;
				const existingIndex = state.tasks.findIndex(
					(task) => task.id === updatedTask.id
				);
				if (existingIndex !== -1) {
					state.tasks[existingIndex] = updatedTask;
				}
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				const deletedTaskId = action.payload;
				state.tasks = state.tasks.filter((task) => task.id !== deletedTaskId);
			});
	},
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectLoading = (state: RootState) => state.tasks.loading;
export const selectError = (state: RootState) => state.tasks.error;

export default tasksSlice.reducer;
