import Image from 'next/image'
import React from 'react'
import { Badge } from '../ui/badge'

import { ICourse } from '@/app.types'

interface Props {
	course: ICourse
}

function InstructorCourseCard({ course }: Props) {
	return (
		<div className='flex flex-col space-y-2 rounded-md bg-background p-2'>
			<div className='relative h-52 w-full'>
				{course.previewImage ? (
					<Image
						src={course.previewImage}
						alt={course.title}
						fill
						className='rounded-md object-cover'
					/>
				) : (
					<div className='h-full w-full rounded-md bg-gray-100 flex items-center justify-center text-gray-500 text-sm'>
						No preview image
					</div>
				)}
			</div>

			<div className='flex items-center justify-between px-2'>
				<h1 className='font-space-grotesk text-2xl font-bold'>
					{course.title}
				</h1>
				<Badge variant={course.published ? 'default' : 'destructive'}>
					{course.published ? 'Published' : 'Draft'}
				</Badge>
			</div>
		</div>
	)
}

export default InstructorCourseCard
