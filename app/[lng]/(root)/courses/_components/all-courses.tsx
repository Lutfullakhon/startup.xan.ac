'use client'

import { ICourse } from '@/app.types'
import CourseCard from '@/components/cards/course.card'
import NoResult from '@/components/shared/no-result'
import Pagination from '@/components/shared/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { courseLanguage, filterCourses, filterLevels } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { formUrlQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
	result: {
		courses: ICourse[]
		isNext: boolean
		totalCourses: number
	}
}

function AllCourses({ result }: Props) {
	const t = useTranslate()
	const searchParams = useSearchParams()
	const router = useRouter()

	const page = searchParams.get('page')

	const { courses, isNext, totalCourses } = result

	const onUpdateParams = (value: string) => {
		const newUrl = formUrlQuery({
			value,
			key: 'filter',
			params: searchParams.toString(),
		})

		router.push(newUrl)
	}

	return (
		<div className='container px-4 mx-auto mt-12 max-w-6xl'>
			<div className='flex items-center justify-between max-md:flex-col max-md:items-start max-md:space-y-2'>
				<h2 className='max-md:justify-center'>
					{t('result1')}{' '}
					<span className='font-space-grotesk font-bold'>{totalCourses}</span>{' '}
					{t('result2')}
				</h2>

				<div className='flex items-center gap-2 max-md:flex-wrap'>
					<p>{t('sortBy')}</p>

					<Select onValueChange={onUpdateParams}>
						<SelectTrigger className='w-[120px] bg-gradient-to-r from-secondary to-background'>
							<SelectValue placeholder={t('filter')} />
						</SelectTrigger>
						<SelectContent>
							{filterCourses.map(item => (
								<SelectItem key={item.name} value={item.name}>
									{t(item.label)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select onValueChange={onUpdateParams}>
						<SelectTrigger className='w-[120px] bg-gradient-to-r from-secondary to-background'>
							<SelectValue placeholder={t('level')} />
						</SelectTrigger>
						<SelectContent>
							{filterLevels.map(item => (
								<SelectItem key={item.name} value={item.name}>
									{t(item.label)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select onValueChange={onUpdateParams}>
						<SelectTrigger className='w-[120px] bg-gradient-to-r from-secondary to-background'>
							<SelectValue placeholder={t('language')} />
						</SelectTrigger>
						<SelectContent>
							{courseLanguage.map(item => (
								<SelectItem key={item} value={item} className='capitalize'>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{courses.map((course, index) => (
					<CourseCard key={index} {...course} />
				))}
			</div>

			{courses.length === 0 && (
				<NoResult
					title={t('noReviews')}
					description={t('noReviewsDescription')}
				/>
			)}

			<div className='mt-10'>
				<Pagination pageNumber={page ? +page : 1} isNext={isNext} />
			</div>
		</div>
	)
}

export default AllCourses
