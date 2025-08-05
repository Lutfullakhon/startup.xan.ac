import { getAdminReviews } from '@/actions/review.action'
import InstructorReviewCard from '@/components/cards/insrtuctor-review.card'
import Header from '@/components/shared/header'
import Pagination from '@/components/shared/pagination'

export type Props = {
	searchParams?: { [key: string]: string | string[] | undefined }
}

async function Page({ searchParams = {} }: Props) {
	const page =
		typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1

	const reviewData = await getAdminReviews({ page, pageSize: 6 })

	return (
		<>
			<Header
				title='All Reviews'
				description='Here are all the reviews you have'
			/>

			<div className='mt-4 rounded-md bg-background p-4'>
				<div className='flex flex-col space-y-3'>
					{reviewData.reviews.map(review => (
						<InstructorReviewCard
							key={review._id}
							review={JSON.parse(JSON.stringify(review))}
						/>
					))}
				</div>

				<div className='mt-6'>
					<Pagination isNext={reviewData.isNext} pageNumber={page} />
				</div>
			</div>
		</>
	)
}

export default Page
