'use client'

import useTranslate from '@/hooks/use-translate'
import { Separator } from '@radix-ui/react-dropdown-menu'
import {
	BadgeCheck,
	CalendarRange,
	Dot,
	ListOrdered,
	MonitorPlay,
	Star,
} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Accordion } from '@/components/ui/accordion'
import ReviewCard from '@/components/cards/review.card'
import { Button } from '@/components/ui/button'
import { ICourse, ISection } from '@/app.types'
import { getCourseSections } from '@/actions/section.action'
import SectionList from './section-list'
import SectionLoading from '@/components/shared/section-loading'

function Overview(course: ICourse) {
	const [isLoading, setIsLoading] = useState(true)
	const [sections, setSections] = useState<ISection[]>([])

	const t = useTranslate()

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await getCourseSections(course._id)
				setSections(res)
				setIsLoading(false)
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
			} catch (error) {
				setIsLoading(false)
			}
		}

		getData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<div className='mt-6 rounded-md bg-gradient-to-t from-background to-secondary p-4 lg:p-6'>
				<h2 className='font-space-grotesk text-3xl font-bold'>
					{t('whatYouWillLearn')}
				</h2>

				<div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
					{course.learning.split(', ').map(item => (
						<div className={'flex gap-2'} key={item}>
							<BadgeCheck className='size-5 text-blue-500' />
							<p className='flex-1'>{item}</p>
						</div>
					))}
				</div>
			</div>

			<div className='mt-8 rounded-md bg-gradient-to-b from-background to-secondary p-4 lg:p-6'>
				<h2 className='font-space-grotesk text-3xl font-bold'>
					{t('courseContent')}
				</h2>

				<div className='mt-2 flex flex-row flex-wrap gap-8'>
					<div className='flex flex-col'>
						<ListOrdered className='size-10' />
						<p className='font-space-grotesk text-xl font-bold'>
							{t('numberOfModules')}
						</p>
						<div className='text-2xl font-medium'>{course.totalSections}</div>
					</div>

					<div className='flex flex-col'>
						<MonitorPlay className='size-10 ' />
						<p className='font-space-grotesk text-xl font-bold'>
							{t('numberOfLessons')}
						</p>
						<div className='text-2xl font-medium'>{course.totalLessons}</div>
					</div>

					<div className='flex flex-col '>
						<CalendarRange className='size-10 ' />
						<p className='font-space-grotesk text-xl font-bold'>
							{t('courseDuration')}
						</p>
						<div className='text-2xl font-medium'>
							{course.totalDuration.split('.')[0]} {t('hours')}{' '}
							{course.totalDuration.split('.')[1]} {t('minutes')}
						</div>
					</div>
				</div>

				<Separator className='my-3' />

				{isLoading ? (
					<div className='mt-4 flex flex-col gap-1'>
						{Array.from({ length: course.totalSections }).map((_, i) => (
							<SectionLoading key={i} />
						))}
					</div>
				) : (
					<Accordion type='single' collapsible>
						{sections.map(section => (
							<SectionList key={section._id} {...section} />
						))}
					</Accordion>
				)}
			</div>

			<div className='mt-8 rounded-md bg-secondary p-4 lg:p-6'>
				<h2 className='font-space-grotesk text-3xl font-bold'>
					{t('requirements')}
				</h2>

				<div className='mt-2'>
					<div className='mt-5 grid grid-cols-1 gap-4 md:grid-cols-2'>
						{course.requirements.split(', ').map(i => (
							<div className={'flex gap-2'} key={i}>
								<Dot />
								<p className='flex-1 text-slate-400'>{i}</p>
							</div>
						))}
					</div>
				</div>

				{/* <div className='mt-2 flex flex-row flex-wrap gap-8'>
					<div className='flex flex-col'>
						<ListOrdered className='size-10 ' />
						<p className='font-space-grotesk text-xl font-bold'>
							{t('numberOfModules')}
						</p>
						<div className='text-2xl font-medium'>{course.totalSections}</div>
					</div>

					<div className='flex flex-col'>
						<MonitorPlay className='size-10 ' />
						<p className='font-space-grotesk text-xl font-bold'>
							{t('numberOfLessons')}
						</p>
						<div className='text-2xl font-medium'>{course.totalLessons}</div>
					</div>

					<div className='flex flex-col '>
						<CalendarRange className='size-10 ' />
						<p className='font-space-grotesk text-xl font-bold'>
							{t('courseDuration')}
						</p>
						<div className='text-2xl font-medium'>
							{course.totalDuration.split('.')[0]} {t('hours')}{' '}
							{course.totalDuration.split('.')[1]} {t('minutes')}
						</div>
					</div>
				</div>

				<Separator className='my-3' />
				{isLoading ? (
					<div className='mt-4 flex flex-col gap-1'>
						{Array.from({ length: course.totalSections }).map((_, i) => (
							<SectionLoading key={i} />
						))}
					</div>
				) : (
					<Accordion type='single' collapsible>
						{sections.map(section => (
							<SectionList key={section._id} {...section} />
						))}
					</Accordion>
				)} */}
			</div>

			<div className='mt-8 flex flex-col pb-20'>
				<div className='mt-6 flex items-center gap-1 font-space-grotesk text-xl'>
					<Star className='fill-[#DD6B20] text-[#DD6B20]' />
					<div className='font-medium'>
						{t('reviewCourse')}: <span className='font-bold'>4.7</span>
					</div>
					<Dot />
					<div className='font-medium'>
						<span className='font-bold'>50 </span>
						{t('review')}
					</div>
				</div>

				<div className='mt-5 grid grid-cols-1 gap-2 lg:grid-cols-2'>
					<ReviewCard />
					<ReviewCard />
					<ReviewCard />
					<ReviewCard />
				</div>

				<Button
					size={'lg'}
					rounded={'full'}
					className='mx-auto mt-6 flex justify-center'
				>
					{t('viewAll')}
				</Button>
			</div>
		</>
	)
}

export default Overview

// const learn = 'Javsicript, Ajax, Algoritm, Promise, Git and Githab, JSON-server'

// const forWhom =
// 	'jghxfhgmguik.cffggjd, ulyisswergdfxcvftylkfui, srtjjchjyhxmch, gmxghmsgrnhnmcdrkyxh'
