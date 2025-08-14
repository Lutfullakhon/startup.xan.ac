'use client'

import { useState } from 'react'
import Navbar from '@/components/shared/navbar'
import Sidebar from '@/components/shared/sidebar'
import { ChildProps } from '@/types'

function AdminLayout({ children }: ChildProps) {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	const toggleSidebar = () => setSidebarOpen(prev => !prev)
	const closeSidebar = () => setSidebarOpen(false)

	return (
		<div className='flex h-screen flex-col bg-background'>
			{/* Navbar at the top */}
			<Navbar toggleSidebar={toggleSidebar} />

			<div className='flex flex-1'>
				{/* Sidebar */}
				<Sidebar
					page='admin'
					isOpen={sidebarOpen}
					closeSidebar={closeSidebar}
				/>

				{/* Main content */}
				<main className={`flex-1 transition-all pt-[12vh] md:pl-[300px] p-4`}>
					<div className='w-full rounded-md bg-secondary px-4 pb-4'>
						{children}
					</div>
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
