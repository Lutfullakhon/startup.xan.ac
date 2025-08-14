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
		<div className='mt-6 border-t border-secondary pt-6'>
			<div className='flex gap-3'>
				{/* Avatar */}
				<Avatar className='h-12 w-12 flex-shrink-0'>
					<AvatarImage src={review.user.picture} />
					<AvatarFallback className='uppercase'>
						{review.user.fullName?.[0] ?? 'U'}
					</AvatarFallback>
				</Avatar>

				{/* Content */}
				<div className='flex flex-col flex-1 min-w-0'>
					{/* Name */}
					<div className='font-semibold break-words'>
						{review.user.fullName}
					</div>

					{/* Stars + Time */}
					<div className='flex flex-wrap items-center gap-1'>
						<ReactStars
							value={review.rating}
							edit={false}
							color2='#DD6B20'
							size={20}
						/>
						<p className='text-sm opacity-50 break-words'>
							{formatDistanceToNow(new Date(review.createdAt), {
								locale: getTimeLocale(`${lng}`),
							})}{' '}
							{t('ago')}
						</p>
					</div>
				</div>
			</div>

			{/* Review Text */}
			<div className='mt-3 text-sm sm:text-base break-words'>{review.data}</div>
		</div>
	)
}

export default ReviewCard
