/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCourseReviews, getReviewsPercentage } from '@/actions/review.action'
import { ICourse, IReview } from '@/app.types'
import ReviewCard from '@/components/cards/review.card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import useTranslate from '@/hooks/use-translate'
import { Dot, Loader2, Star } from 'lucide-react'
import { useState } from 'react'
import ReactStars from 'react-stars'

function AllReviews(course: ICourse) {
	const [reviews, setReviews] = useState<IReview[]>([])
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [count, setCount] = useState(3)
	const [percentages, setPercentages] = useState<{ [key: string]: number }>()

	const t = useTranslate()

	const onOpenReviews = async () => {
		if (reviews.length) return setOpen(true)

		setLoading(true)
		try {
			const [reviews, percentages] = await Promise.all([
				getCourseReviews(course._id, count),
				getReviewsPercentage(course._id),
			])
			setReviews(reviews)
			setPercentages(percentages)
			setLoading(false)
			setOpen(true)
		} catch (error) {
			setLoading(false)
		}
	}

	const onLoadMore = async () => {
		setCount(prev => prev + 3)
		const newCount = count + 3
		setLoading(true)
		try {
			const reviews = await getCourseReviews(course._id, newCount)
			setReviews(reviews)
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	console.log(percentages)

	return (
		<>
			<Button
				size={'lg'}
				rounded={'full'}
				className='mx-auto mt-6 flex justify-center'
				onClick={onOpenReviews}
				disabled={loading}
			>
				{loading ? <Loader2 className='animate-spin' /> : t('viewAll')}
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='custom-scrollbar max-h-full max-w-full overflow-y-auto md:max-w-4xl'>
					<DialogTitle className='sr-only'>{t('courseReviews')}</DialogTitle>
					<div className='mt-2 flex items-center gap-1'>
						<Star className='fill-[#DD6B20] text-[#DD6B20]' />
						<div className='text-xl font-medium'>
							{t('reviewCourse')}: {course.rating.toString().slice(0, 3)}
						</div>
						<Dot />
						<div className='text-xl font-medium'>
							{course.reviewCount} {t('review')}
						</div>
					</div>

					<div className='flex flex-col gap-5 md:flex-row'>
						<div className='w-full md:w-[30%]'>
							{percentages &&
								[5, 4, 3, 2, 1].map(idx => (
									<div key={idx} className='flex items-center gap-2'>
										<div className='relative h-3 w-[60%] bg-gray-100 dark:bg-gray-900 md:w-[40%]'>
											<div
												className='absolute inset-0 bg-gray-900 dark:bg-gray-100'
												style={{ width: `${percentages[idx]}%` }}
											/>
										</div>
										<ReactStars edit={false} value={idx} />
										<div>{percentages[idx]}%</div>
									</div>
								))}
						</div>
						<div className='w-full md:w-[70%]'>
							{reviews.map(review => (
								<ReviewCard key={review._id} review={review} />
							))}

							{course.reviewCount > count && (
								<Button
									size={'lg'}
									rounded={'full'}
									className='mx-auto mt-6 flex justify-center'
									onClick={onLoadMore}
									disabled={loading}
								>
									{loading ? (
										<Loader2 className='animate-spin' />
									) : (
										t('loadMore')
									)}
								</Button>
							)}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default AllReviews
