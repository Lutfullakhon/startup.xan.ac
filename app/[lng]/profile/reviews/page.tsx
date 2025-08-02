import { getUserReviews } from '@/actions/user.action'
import InstructorReviewCard from '@/components/cards/insrtuctor-review.card'
import Header from '@/components/shared/header'
import NoResult from '@/components/shared/no-result'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import { auth } from '@clerk/nextjs/server'

async function Page({ params }: LngParams) {
	const { userId } = await auth()
	const { t } = await translation((await params).lng)
	const reviews = await getUserReviews(userId!)

	return (
		<>
			<Header title={t('review')} description={t('reviewDescription')} />
			{reviews.length === 0 && (
				<NoResult
					title={t('noReviews')}
					description={t('noReviewsDescription')}
				/>
			)}

			<div className='mt-4 flex max-w-xl flex-col space-y-3'>
				{reviews.map(review => (
					<InstructorReviewCard
						key={review._id}
						review={JSON.parse(JSON.stringify(review))}
						isProfile
					/>
				))}
			</div>
		</>
	)
}

export default Page
