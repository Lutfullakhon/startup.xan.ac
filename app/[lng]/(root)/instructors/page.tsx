import { getAdminInstructors } from '@/actions/user.action'
import InstructorCard from '@/components/cards/instructor.card'
import Pagination from '@/components/shared/pagination'
import TopBar from '@/components/shared/top-bar'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Praktikum | Barcha muallimlar',
	description:
		'Platformamizda mavjud boʻlgan barcha muallimlar roʻyxati. Oʻzingizga mos muallimni toping va oʻrganishni boshlang!',
}

export type Props = {
	searchParams?: { [key: string]: string | string[] | undefined }
}

async function Page({ searchParams }: Props) {
	const page =
		searchParams && typeof searchParams.page === 'string'
			? parseInt(searchParams.page)
			: 1

	const instructorData = await getAdminInstructors({ page, pageSize: 8 })

	return (
		<>
			<TopBar label='allInstructors' description='allInstructorsDescription' />

			<div className='container mx-auto mt-12 max-w-6xl'>
				<div className='mt-4 grid grid-cols-4 gap-4'>
					{instructorData.instructors.map(instructor => (
						<InstructorCard
							key={instructor._id}
							instructor={JSON.parse(JSON.stringify(instructor))}
						/>
					))}
				</div>
				<div className='mt-4'>
					<Pagination isNext={instructorData.isNext} pageNumber={page} />
				</div>
			</div>
		</>
	)
}

export default Page
