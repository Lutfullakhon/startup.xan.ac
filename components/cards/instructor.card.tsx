'use client'

import { IUser } from '@/app.types'
import Image from 'next/image'
import CustomImage from '../shared/custom-image'

interface Props {
	instructor: IUser
}

function InstructorCard({ instructor }: Props) {
	// Defensive checks to avoid runtime errors
	if (!instructor || !instructor.picture || !instructor.fullName) {
		return (
			<div className='flex flex-col items-center justify-center rounded-md bg-secondary p-4 text-center text-sm text-muted-foreground'>
				<p>Instructor information is missing or incomplete.</p>
			</div>
		)
	}

	return (
		<div className='flex flex-col space-y-1'>
			<div className='relative h-72 w-full'>
				<CustomImage
					src={instructor.picture}
					alt={instructor.fullName}
					className='rounded-md'
				/>
			</div>
			<h1 className='font-space-grotesk text-2xl font-bold'>
				{instructor.fullName}
			</h1>
			<h3 className='font-medium text-muted-foreground'>
				{instructor.job || 'Unknown Position'}
			</h3>
		</div>
	)
}

export default InstructorCard
