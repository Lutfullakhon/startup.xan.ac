import React from 'react'
import Header from '../../../../components/shared/header'

import InstructorCourseCard from '@/components/cards/instructor-course.card'
import { getCourses } from '@/actions/course.action'
import { auth } from '@clerk/nextjs/server'
import Pagination from '@/components/shared/pagination'

export type Props = {
	params: Promise<{ lessonId: string; courseId: string; lng: string }>
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

async function Page({ searchParams }: Props) {
	const resolvedSearchParams = await searchParams
	const { userId } = await auth()
	const page = resolvedSearchParams?.page ? +resolvedSearchParams.page : 1

	const result = await getCourses({ clerkId: userId!, page })

	return (
		<>
			<Header title='My courses' description='Here are your latest courses' />

			{/* Responsive grid */}
			<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{result.courses.map(item => (
					<InstructorCourseCard
						key={item._id}
						course={JSON.parse(JSON.stringify(item))}
					/>
				))}
			</div>

			<div className='mt-6'>
				<Pagination pageNumber={page} isNext={result.isNext} />
			</div>
		</>
	)
}

export default Page
