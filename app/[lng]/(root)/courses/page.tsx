import TopBar from '@/components/shared/top-bar'
import AllCourses from './_components/all-courses'
import { getAllCourses } from '@/actions/course.action'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
	title: 'Praktikum | Barcha kurslar',
	description:
		"Platformamizda mavjud bo'lgan barcha kurslar ro'yxati. O'zingizga mos kursni toping va o'rganishni boshlang!",
}

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
			<Suspense fallback={<div>Loading...</div>}>
				<AllCourses result={result} />
			</Suspense>
		</>
	)
}

export default Page
