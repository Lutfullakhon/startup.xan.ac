import React from 'react'
import Header from '../../../../components/shared/header'
import StatisticsCard from '@/components/cards/statistics.card'
import { MessageSquare, MonitorPlay } from 'lucide-react'
import { PiStudent } from 'react-icons/pi'
import { GrMoney } from 'react-icons/gr'
import ReviewCard from '@/components/cards/review.card'
import { auth } from '@clerk/nextjs/server'
import { getCourses } from '@/actions/course.action'
import InstructorCourseCard from '@/components/cards/instructor-course.card'
import { formatAndDivideNumber } from '@/lib/utils'
import { getReviews } from '@/actions/review.action'
import { getRole } from '@/actions/user.action'
import { redirect } from 'next/navigation'

async function Page() {
	const { userId } = await auth()
	const user = await getRole(userId!)

	if (user.role !== 'instructor') return redirect('/')

	const result = await getCourses({ clerkId: userId! })
	const { reviews, totalReviews } = await getReviews({ clerkId: userId! })

	return (
		<>
			<Header title='Dashboard' description='Welcome to your dashboard' />

			{/* Responsive statistics cards */}
			<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				<StatisticsCard
					label='Total courses'
					value={result.totalCourses.toString()}
					Icon={MonitorPlay}
				/>
				<StatisticsCard
					label='Total students'
					value={formatAndDivideNumber(result.totalStudents)}
					Icon={PiStudent}
				/>
				<StatisticsCard
					label='Reviews'
					value={formatAndDivideNumber(totalReviews)}
					Icon={MessageSquare}
				/>
				<StatisticsCard
					label='Total sales'
					value={result.totalEearnings.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
					Icon={GrMoney}
				/>
			</div>

			<Header
				title='Latest courses'
				description='Here are your latest courses'
			/>

			{/* Responsive courses grid */}
			<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{result.courses
					.map(course => (
						<InstructorCourseCard
							key={course.title}
							course={JSON.parse(JSON.stringify(course))}
						/>
					))
					.slice(0, 3)}
			</div>

			<Header title='Reviews' description='Here are your latest reviews' />

			{/* Responsive reviews grid */}
			<div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{reviews.map(review => (
					<div className='rounded-md bg-background px-4 pb-4' key={review._id}>
						<ReviewCard review={JSON.parse(JSON.stringify(review))} />
					</div>
				))}
			</div>
		</>
	)
}

export default Page
