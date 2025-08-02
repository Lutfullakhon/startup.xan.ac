import TopBar from '@/components/shared/top-bar'
import AllCourses from './_components/all-courses'
import { getAllCourses } from '@/actions/course.action'

export type Props = {
	params: Promise<{ id: string; slug: string }>
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

async function Page({ searchParams }: Props) {
	const resolvedSearchParams = searchParams ? await searchParams : {}

	const searchQuery = Array.isArray(resolvedSearchParams.q)
		? resolvedSearchParams.q[0]
		: resolvedSearchParams.q

	const filter = Array.isArray(resolvedSearchParams.filter)
		? resolvedSearchParams.filter[0]
		: resolvedSearchParams.filter

	const page = Array.isArray(resolvedSearchParams.page)
		? parseInt(resolvedSearchParams.page[0])
		: parseInt(resolvedSearchParams.page || '1')

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
