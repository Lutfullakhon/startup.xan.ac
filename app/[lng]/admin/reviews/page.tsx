// app/[lng]/(dashboard)/reviews/page.tsx  (adjust path as needed)
import { getAdminReviews } from '@/actions/review.action'
import InstructorReviewCard from '@/components/cards/insrtuctor-review.card'
import Header from '@/components/shared/header'
import Pagination from '@/components/shared/pagination'

export type Props = {
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
	// await searchParams safely
	const resolvedSearch = searchParams ? await searchParams : undefined
	const page =
		resolvedSearch && typeof resolvedSearch.page === 'string'
			? parseInt(resolvedSearch.page, 10)
			: 1

	const reviewData = await getAdminReviews({ page, pageSize: 6 })

	// ensure plain serializable objects
	const reviews = (reviewData.reviews || []).map(r => {
		const obj = JSON.parse(JSON.stringify(r))

		if (obj && obj._id && typeof obj._id !== 'string') {
			obj._id = String(obj._id)
		}
		if (obj && obj.createdAt)
			obj.createdAt = new Date(obj.createdAt).toISOString()
		if (obj && obj.updatedAt)
			obj.updatedAt = new Date(obj.updatedAt).toISOString()

		return obj
	})

	return (
		<>
			<Header
				title='All Reviews'
				description='Here are all the reviews you have'
			/>

			<div className='mt-4 rounded-md bg-background p-4'>
				<div className='flex flex-col space-y-3'>
					{reviews.map(review => (
						<InstructorReviewCard key={review._id} review={review} />
					))}
				</div>

				<div className='mt-6'>
					<Pagination isNext={reviewData.isNext} pageNumber={page} />
				</div>
			</div>
		</>
	)
}
