import { Skeleton } from '../ui/skeleton'

function ReviewLoading() {
	return (
		<div className='mt-8'>
			<div className='flex'>
				<Skeleton className='h-4 w-1/3' />
				<Skeleton className='ml-4 size-4' />
				<Skeleton className='ml-4 h-4 w-1/12' />
			</div>

			<div className='mt-5 grid grid-cols-1 gap-2 lg:grid-cols-2'>
				{Array.from({ length: 4 }).map((_, i) => (
					<div className='mt-6 border-t border-t-secondary' key={i}>
						<div className='mt-8 flex gap-2'>
							<Skeleton className='size-12 rounded-full' />

							<div className='flex flex-col'>
								<Skeleton className='h-3 w-full' />
								<div className='mt-2 flex items-center gap-1'>
									<Skeleton className='h-4 w-24' />
									<Skeleton className='h-4 w-16' />
								</div>
							</div>
						</div>

						<div className='mt-2'>
							<Skeleton className='h-12 w-full' />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ReviewLoading
