import TopBar from '@/components/shared/top-bar'
import AllCourses from './_components/all-courses'
import { getAllCourses } from '@/actions/course.action'
import { SearchParamsProps } from '@/app.types'

interface PageProps {
	searchParams: { [key: string]: string | string[] | undefined }
}

async function Page({ searchParams }: PageProps) {
	const searchQuery = Array.isArray(searchParams.q)
		? searchParams.q[0]
		: searchParams.q
	const filter = Array.isArray(searchParams.filter)
		? searchParams.filter[0]
		: searchParams.filter
	const page = Array.isArray(searchParams.page)
		? parseInt(searchParams.page[0])
		: parseInt(searchParams.page || '1')

	const resultJSON = await getAllCourses({
		searchQuery,
		filter,
		page,
	})

	const result = JSON.parse(JSON.stringify(resultJSON))

	return (
		<>
			<TopBar label='allCourses' description='allCourseDescription' />
			<AllCourses result={result} />
		</>
	)
}

export default Page
