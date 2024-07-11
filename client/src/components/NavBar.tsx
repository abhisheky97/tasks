import React from 'react';
import { Link } from 'react-router-dom';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from '@/components/ui/navigation-menu';

const NavBar = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList className='flex flex-col items-start gap-5 border border-white p-3'>
				<NavigationMenuItem>
					<Link
						to='/tasks'
						className='text-white px-1'>
						Tasks
					</Link>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<Link
						to='/calendar'
						className='text-white'>
						Calendar
					</Link>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default NavBar;
