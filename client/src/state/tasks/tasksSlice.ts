import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

interface Todo {
	id: number;
	description: string;
	createdAt: string;
	dueDate: string;
	completed: boolean;
}

interface TasksState {
	todos: Todo[];
	loading: boolean;
	error: string | null;
}

const initialState: TasksState = {
	todos: [],
	loading: false,
	error: null,
};

export const fetchTodos = createAsyncThunk('tasks/fetchTodos', async () => {
	const response = await axios.get<Todo[]>('http://localhost:3000/tasks');
	return response.data;
});

export const addTask = createAsyncThunk(
	'tasks/addTask',
	async (newTask: Omit<Todo, 'id'>) => {
		const response = await axios.post<Todo>(
			'http://localhost:3000/tasks',
			newTask
		);
		return response.data;
	}
);

export const updateTask = createAsyncThunk(
	'tasks/updateTask',
	async (updatedTask: Todo) => {
		const { id, ...rest } = updatedTask;
		const response = await axios.put<Todo>(
			`http://localhost:3000/tasks/${id}`,
			rest
		);
		return response.data;
	}
);

export const deleteTask = createAsyncThunk(
	'tasks/deleteTask',
	async (taskId: number) => {
		await axios.delete(`http://localhost:3000/tasks/${taskId}`);
		return taskId;
	}
);

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.loading = false;
				state.todos = action.payload;
			})
			.addCase(fetchTodos.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? 'Failed to fetch todos';
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.todos.push(action.payload);
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const updatedTodo = action.payload;
				const existingIndex = state.todos.findIndex(
					(todo) => todo.id === updatedTodo.id
				);
				if (existingIndex !== -1) {
					state.todos[existingIndex] = updatedTodo;
				}
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				const deletedTodoId = action.payload;
				state.todos = state.todos.filter((todo) => todo.id !== deletedTodoId);
			});
	},
});

export const selectTodos = (state: RootState) => state.tasks.todos;
export const selectLoading = (state: RootState) => state.tasks.loading;
export const selectError = (state: RootState) => state.tasks.error;

export default tasksSlice.reducer;
