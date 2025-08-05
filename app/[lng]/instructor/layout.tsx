import { ChildProps } from '@/types'
import React from 'react'
import Navbar from '../../../components/shared/navbar'
import Sidebar from '../../../components/shared/sidebar'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<Navbar />
			<Sidebar page={'instructor'} />
			<main className='w-full pl-[320px] pt-[12vh]'>
				<div className='size-full rounded-md bg-secondary px-4 pb-4'>
					{children}
				</div>
			</main>
		</div>
	)
}

export default Layout
