'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import ReactStars from '@/components/react-stars-client'
import { IReview } from '@/app.types'
import { formatDistanceToNow } from 'date-fns'
import { useParams } from 'next/navigation'
import useTranslate from '@/hooks/use-translate'
import { getTimeLocale } from '@/lib/utils'

function ReviewCard({ review }: { review: IReview }) {
	const { lng } = useParams()
	const t = useTranslate()
	if (!review || !review.user) return null

	return (
		<div className='mt-6 border-t border-t-secondary'>
			<div className='mt-8 flex gap-2'>
				<Avatar>
					<AvatarImage src={review.user.picture} />
					<AvatarFallback className='uppercase'>
						{review.user.fullName?.[0] ?? 'U'}
					</AvatarFallback>
				</Avatar>

				<div className='flex flex-col'>
					<div>{review.user.fullName} </div>
					<div className='flex items-center gap-1'>
						<ReactStars value={review.rating} edit={false} color2='#DD6B20' />
						<p className='text-sm opacity-50'>
							{formatDistanceToNow(new Date(review.createdAt), {
								locale: getTimeLocale(`${lng}`),
							})}{' '}
							{t('ago')}
						</p>
					</div>
				</div>
			</div>

			<div className='mt-2'>{review.data}</div>
		</div>
	)
}

export default ReviewCard
