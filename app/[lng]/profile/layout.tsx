import Navbar from '@/components/shared/navbar'
import Sidebar from '@/components/shared/sidebar'
import { ChildProps } from '@/types'

function Layout({ children }: ChildProps) {
	return (
		<>
			<Navbar isProfile />
			<Sidebar page='user' />
			<main className='w-full p-4 pl-[320px] pt-[12vh] max-md:pl-20'>
				<div className='size-full rounded-md bg-secondary px-4 pb-4'>
					{children}
				</div>
			</main>
		</>
	)
}

export default Layout
