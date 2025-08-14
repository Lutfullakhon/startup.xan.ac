'use client'

import { ChildProps } from '@/types'
import { useState } from 'react'
import Navbar from '../../../components/shared/navbar'
import Sidebar from '../../../components/shared/sidebar'

function Layout({ children }: ChildProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const toggleSidebar = () => setSidebarOpen(prev => !prev)

	return (
		<div className='flex min-h-screen flex-col bg-background'>
			{/* Navbar */}
			<Navbar toggleSidebar={toggleSidebar} />

			<div className='flex flex-1'>
				{/* Sidebar */}
				<Sidebar
					page='instructor'
					isOpen={sidebarOpen}
					closeSidebar={() => setSidebarOpen(false)}
				/>

				{/* Main content */}
				<main
					className={`flex-1 pt-[12vh] transition-all
						md:pl-[300px] ${!sidebarOpen ? 'pl-0' : ''}`}
				>
					<div className='w-full rounded-md bg-secondary px-2 sm:px-4 pb-4'>
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}

export default Layout
