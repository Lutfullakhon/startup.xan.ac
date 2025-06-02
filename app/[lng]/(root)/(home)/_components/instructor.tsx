'use client'

import InstructorCard from '@/components/cards/instructor.card'
import { Button } from '@/components/ui/button'
import { instructors } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Instructor() {
	const t = useTranslate()

	return (
		<div className='container mx-auto max-w-6xl py-12 px-4'>
			{/* Header + Filter Buttons */}
			<div className='flex items-center justify-between'>
				<div className='flex flex-col space-y-1'>
					<h1 className='font-space-grotesk text-3xl font-bold'>
						{t('learnInstructors')}
					</h1>
					<p className='text-sm text-muted-foreground'>
						{t('learnInstructorsDescription')}
					</p>
				</div>

				<div className='flex items-center gap-1 self-end'>
					<Button variant={'secondary'}>
						<span>{t('viewaAll')} </span>
						<MoveUpRight className='ml-2 size-5 font-bold' />
					</Button>
				</div>
			</div>

			<div
				className='mt-6
			grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'
			>
				{instructors.map(item => (
					<InstructorCard key={item.name} {...item} />
				))}
			</div>

			<div className='mt-6 text-center text-sm'>
				{t('becomeInstructor1')}{' '}
				<Link
					href={'/becomeInstructor'}
					className='text-blue-500 underline hover:text-blue-600'
				>
					{t('becomeInstructor2')}{' '}
				</Link>
			</div>
		</div>
	)
}

export default Instructor
