import { ChildProps } from '@/types'
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'
import ReviewModal from '@/components/modals/review.modal'

interface Props extends ChildProps {
	params: { lng: string; courseId: string }
}
async function Layout({ params: { courseId, lng }, children }: Props) {
	return (
		<div className='relative'>
			<Navbar />
			<div className='flex'>
				<Sidebar courseId={courseId} lng={lng} />
				<section className='flex min-h-screen flex-1 flex-col px-4 pb-6 pt-24 max-md:pb-14 sm:px-14'>
					<div className='mx-auto w-full max-w-5xl'>{children}</div>
				</section>
			</div>
			<ReviewModal />
		</div>
	)
}

export default Layout
