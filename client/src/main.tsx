import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout';
import './index.css';
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';
import { Tasks, Calendar, Home } from './components/index';
import { Provider } from 'react-redux';
import { store } from './state/store';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={<Layout />}>
			<Route
				path='/'
				element={<Home />}
			/>
			<Route
				path='/tasks'
				element={<Tasks />}
			/>
			<Route
				path='/calendar'
				element={<Calendar />}
			/>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
