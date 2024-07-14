import { NavBar } from './components/index';
import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div className='bg-slate-900 w-full h-screen grid grid-cols-12 gap-4 p-3'>
			<div className='hidden md:block md:col-span-2 border-[1px] border-white p-3'>
				<NavBar />
			</div>
			<div className='text-white col-span-10 border-[1px] border-white p-3'>
				<Outlet />
			</div>
		</div>
	);
}

export default Layout;
