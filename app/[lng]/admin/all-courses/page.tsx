import { getAdminCourses } from '@/actions/course.action'
import AdminCourseCard from '@/components/cards/admin-course.card'
import Header from '@/components/shared/header'
import Pagination from '@/components/shared/pagination'

export type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

async function Page({ searchParams }: Props) {
	const search = await searchParams
	const page =
		search && typeof search.page === 'string' ? parseInt(search.page) : 1

	const courseData = await getAdminCourses({ page, pageSize: 6 })

	return (
		<>
			<Header
				title='All Courses'
				description='Here are all the courses you have'
			/>

			<div className='mt-4 grid grid-cols-3 gap-4'>
				{courseData.courses.map(item => (
					<AdminCourseCard
						key={item._id}
						course={JSON.parse(JSON.stringify(item))}
					/>
				))}
			</div>

			<div className='mt-6'>
				<Pagination pageNumber={page} isNext={courseData.isNext} />
			</div>
		</>
	)
}

export default Page
