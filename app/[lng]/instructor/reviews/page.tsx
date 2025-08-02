import { Separator } from '@/components/ui/separator'
import Header from '../../../../components/shared/header'
import InstructorReviewCard from '@/components/cards/insrtuctor-review.card'
import { auth } from '@clerk/nextjs/server'
import { SearchParamsProps } from '@/app.types'
import { getReviews } from '@/actions/review.action'
import Pagination from '@/components/shared/pagination'

async function Page({ searchParams }: SearchParamsProps) {
	const { userId } = await auth()

	const page = searchParams.page ? +searchParams.page : 1

	const result = await getReviews({ clerkId: userId!, page, pageSize: 6 })

	return (
		<>
			<Header
				title='Reviews'
				description='Here you can see all the reviews of your courses'
			/>

			<div className='mt-4 rounded-md bg-background p-4'>
				<h3 className='font-space-grotesk text-lg font-medium'>All Reviews</h3>
				<Separator className='my-3' />

				<div className='flex flex-col space-y-3'>
					{result.reviews.map(review => (
						<InstructorReviewCard
							key={review._id}
							review={JSON.parse(JSON.stringify(review))}
						/>
					))}
				</div>

				<div className='mt-6'>
					<Pagination isNext={result.isNext} pageNumber={page} />
				</div>
			</div>
		</>
	)
}

export default Page
