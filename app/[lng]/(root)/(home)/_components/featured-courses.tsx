'use client'

import { ICourse } from '@/app.types'
import CourseCard from '@/components/cards/course.card'
import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import { filterCourses } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { cn, formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
	courses: ICourse[]
}

function FeaturedCourses({ courses }: Props) {
	const t = useTranslate()
	const searchParams = useSearchParams()
	const router = useRouter()

	const onUpdateParams = (value: string) => {
		const newUrl = formUrlQuery({
			value,
			key: 'filter',
			params: searchParams.toString(),
			toCourses: true,
		})

		router.push(newUrl)
	}

	return (
		<div className='container mx-auto max-w-6xl py-12 px-4'>
			{/* Header + Filter Buttons */}
			<div className='flex items-center justify-between max-md:flex-col max-md:items-start'>
				<div className='flex flex-col space-y-1'>
					<h1 className='font-space-grotesk text-3xl font-bold'>
						{t('exploreCourses')}
					</h1>
					<p className='text-sm text-muted-foreground'>
						{t('exploreCoursesDescription')}
					</p>
				</div>

				<div
					className={cn(
						'flex gap-1 self-end',
						'max-md:mt-4 max-md:w-full max-md:overflow-x-auto max-md:rounded-full max-md:p-2 max-md:bg-background',
						'scrollbar-hide'
					)}
				>
					{filterCourses.map(item => (
						<Button
							key={item.name}
							variant={item.name ? 'secondary' : 'ghost'}
							className={cn(
								'font-medium whitespace-nowrap',
								item.name && 'text-primary'
							)}
							onClick={() => onUpdateParams(item.name)}
						>
							{t(item.label)}
						</Button>
					))}
				</div>
			</div>

			{/* Mobile/Tablet Layout - Column */}
			<div className='mt-6 flex flex-col space-y-4 md:hidden'>
				{courses.map(course => (
					<CourseCard key={course.title} {...course} />
				))}
			</div>

			{/* Desktop Carousel */}
			<div className='relative mt-6 hidden md:block'>
				<Carousel opts={{ align: 'start' }} className='w-full'>
					<CarouselContent>
						{courses.map(course => (
							<CarouselItem
								key={course.title}
								className='md:basis-1/2 lg:basis-1/3'
							>
								<CourseCard {...course} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	)
}

export default FeaturedCourses
