import { getCourseById } from '@/actions/course.action'
import React from 'react'
import Header from '../../../../../components/shared/header'
import Actions from './_components/actions'
import { Separator } from '@/components/ui/separator'
import { Images, LayoutPanelLeft, Settings } from 'lucide-react'
import CourseFields from './_components/course-fields'
import Description from './_components/description'
import Information from './_components/information'
import SelectFields from './_components/select-fields'
import Sections from './_components/sections'
import Price from './_components/price'
import PreviewImage from './_components/preview-image'
import { getSections } from '@/actions/section.action'

async function Page({ params }: { params: { courseId: string } }) {
	const { courseId } = params

	const courseJSON = await getCourseById(courseId)
	const sectionsJSON = await getSections(courseId)

	const course = JSON.parse(JSON.stringify(courseJSON))
	const sections = JSON.parse(JSON.stringify(sectionsJSON))

	if (!course) {
		// You can customize this error UI
		return (
			<div className='text-red-500 p-4'>
				Error: Course not found with ID {courseId}
			</div>
		)
	}

	return (
		<>
			<div className='flex items-center justify-between'>
				<Header
					title={course.title}
					description='Manage your course and see how it is performing.'
				/>
				<Actions {...course} />
			</div>
			<Separator className='my-3 bg-muted-foreground' />

			<div className='mt-6 grid grid-cols-2 gap-4'>
				<div className='flex flex-col space-y-2'>
					<div className='flex items-center gap-2'>
						<span className='font-space-grotesk text-3xl font-medium'>
							Course fields
						</span>{' '}
						<Settings />
					</div>
					<CourseFields {...course} />
					<Description {...course} />
					<Information {...course} />
					<SelectFields {...course} />
					<Price {...course} />
				</div>
				<div className='flex flex-col space-y-2'>
					{/* Sections */}
					<div className='flex items-center gap-2'>
						<span className='font-space-grotesk text-3xl font-medium'>
							Course Sections
						</span>{' '}
						<LayoutPanelLeft />
					</div>
					<Sections course={course} sections={sections} />

					{/* Preview image */}
					<div className='flex items-center gap-2'>
						<span className='font-space-grotesk text-3xl font-medium'>
							Preview Image
						</span>{' '}
						<Images />
					</div>
					<PreviewImage {...course} />
				</div>
			</div>
		</>
	)
}

export default Page
