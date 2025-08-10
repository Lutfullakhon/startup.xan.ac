'use client'

import { useReview } from '@/hooks/use-review'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import FillLoading from '../shared/fill-loading'
import { useEffect, useState, useCallback } from 'react' // Added useCallback
import ReactStars from 'react-stars'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { reviewSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { createReview, getReview, updateReview } from '@/actions/review.action'
import { useAuth } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { IReview } from '@/app.types'
import useTranslate from '@/hooks/use-translate'

function ReviewModal() {
	const [rating, setRating] = useState(0)
	const [review, setReview] = useState<IReview | null>(null)

	const { isOpen, onClose, isLoading, startLoading, stopLoading } = useReview()
	const { userId } = useAuth()
	const params = useParams()
	const courseId = params?.id as string
	const t = useTranslate()

	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: { data: '' },
	})

	// Fixed 1: Memoized submit handler
	const onSubmit = useCallback(
		async (values: z.infer<typeof reviewSchema>) => {
			startLoading()
			const data = { ...values, rating }

			let promise
			if (review) {
				promise = updateReview({ ...data, _id: review._id })
			} else {
				promise = createReview(data, userId!, `${courseId}`)
			}

			promise.then(() => onClose()).finally(() => stopLoading())

			toast.promise(promise, {
				loading: t('loading'),
				success: t('successfully'),
				error: t('error'),
			})
		},
		[rating, review, userId, courseId, startLoading, stopLoading, onClose, t]
	)

	// Fixed 2: Correct useEffect dependencies
	useEffect(() => {
		const fetchReview = async () => {
			if (!courseId || !userId) return

			startLoading()
			try {
				const res = await getReview(courseId, userId)
				if (res) {
					setRating(res.rating)
					setReview(res)
					form.setValue('data', res.data)
				}
			} catch (err) {
				console.error('Failed to fetch review:', err)
			} finally {
				stopLoading()
			}
		}

		if (isOpen) {
			fetchReview()
		}
	}, [isOpen, courseId, userId, form, startLoading, stopLoading]) // Added missing dependencies

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogTitle className='sr-only'>{t('courseReview')}</DialogTitle>
				{isLoading && <FillLoading />}
				<div className='flex flex-col items-center justify-center space-y-4'>
					<div className='mt-4 font-space-grotesk text-xl font-medium'>
						{review
							? t('changeReview')
							: rating
							? t('whyReview')
							: t('rateCourse')}
					</div>

					<ReactStars
						value={rating}
						size={30}
						onChange={val => setRating(val)}
						color2='#E59819'
					/>

					{rating ? (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='flex w-full flex-col gap-4'
							>
								<FormField
									control={form.control}
									name='data'
									render={({ field }) => (
										<FormItem className='flex w-full flex-col'>
											<FormControl>
												<Textarea
													className='h-36 resize-none border-none bg-secondary font-medium'
													placeholder={t('reviewPlaceholder')}
													disabled={isLoading}
													{...field}
												/>
											</FormControl>
											<FormMessage className='text-red-500' />
										</FormItem>
									)}
								/>

								<div className='flex justify-end'>
									<Button
										type='submit'
										disabled={isLoading}
										className='font-space-grotesk font-bold'
									>
										{review ? t('change') : t('submit')}
									</Button>
								</div>
							</form>
						</Form>
					) : null}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ReviewModal
