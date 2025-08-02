import { ChildProps } from '@/types'
import Sidebar from './_components/sidebar'

function Layout({ children }: ChildProps) {
	return (
		<>
			<Sidebar />

			<main className='w-full p-4 pr-[420px] max-md:pr-24'>
				<div className='size-full rounded-md bg-gradient-to-b from-background to-secondary px-4 pb-4'>
					{children}
				</div>
			</main>
		</>
	)
}

export default Layout
