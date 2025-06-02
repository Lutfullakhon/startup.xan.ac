'use client'

import React from 'react'
import Header from '../_components/header'
import { Separator } from '@radix-ui/react-dropdown-menu'
import InsrtuctorReviewCard from '@/components/cards/insrtuctor-review.card'

function Page() {
	return (
		<>
			<Header
				title='Reviews'
				description='Here you can see all the reviews of your courses'
			/>

			<div className='mt-4 rounded-md bg-background p-4'>
				<h3 className='font-space-grotesk text-lg font-medium'>All reviews</h3>
				<Separator className='my-3' />

				<div className='flex flex-col space-y-3'>
					<InsrtuctorReviewCard />
					<InsrtuctorReviewCard />
					<InsrtuctorReviewCard />
				</div>
			</div>
		</>
	)
}

export default Page
