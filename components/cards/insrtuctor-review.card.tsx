'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Flag } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import ReactStars from '@/components/react-stars-client'
import { IReview } from '@/app.types'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { setFlag } from '@/actions/review.action'
import { toast } from 'sonner'
import FillLoading from '../shared/fill-loading'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { sendNotification } from '@/actions/notification.action'

interface Props {
	review: IReview
	isProfile?: boolean
	isAdmin?: boolean
}

function InsrtuctorReviewCard({ review, isProfile, isAdmin }: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()

	const handleFlag = async () => {
		setIsLoading(true)
		const upd = setFlag(review._id, !review.isFlag, pathname).finally(() =>
			setIsLoading(false)
		)

		const not = sendNotification(review.user.clerkId, 'messageReviewFlagged')

		const promise = Promise.all([upd, not])

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully',
			error: 'Something went wrong. Please try again.',
		})
	}

	return (
		<div
			className={cn(
				'relative flex gap-4 border-b pb-4',
				isAdmin && 'bg-background p-2 rounded-md'
			)}
		>
			{isLoading && <FillLoading />}
			<div className='flex-1'>
				<div className='flex gap-3'>
					<Avatar>
						<AvatarImage src={review.user.picture} />
						<AvatarFallback className='uppercase'>
							{review.user.fullName[0]}
						</AvatarFallback>
					</Avatar>

					<div className='flex flex-col'>
						<div className='font-space-grotesk text-sm'>
							{review.user.fullName}{' '}
							<span className='text-sm text-muted-foreground'>
								{formatDistanceToNow(new Date(review.createdAt))} ago
							</span>
						</div>
						<ReactStars value={review.rating} edit={false} color2='#E59819' />
						<div className='font-space-grotesk font-bold'>
							{review.course.title}
						</div>
						<p className='text-sm text-muted-foreground'>{review.data}</p>
					</div>
				</div>
			</div>
			{isProfile ? (
				<Button variant={'ghost'} size={'icon'} className='self-start'>
					{review.isFlag ? (
						<FaTimes className='text-red-500' />
					) : (
						<FaCheck className='text-green-500' />
					)}
				</Button>
			) : (
				<Button
					size={'icon'}
					variant={'ghost'}
					className='self-start'
					onClick={handleFlag}
				>
					<Flag
						className={cn(
							'text-muted-foreground',
							review.isFlag && 'fill-white'
						)}
					/>
				</Button>
			)}
		</div>
	)
}

export default InsrtuctorReviewCard
