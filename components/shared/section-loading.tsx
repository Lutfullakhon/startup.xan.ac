import { Skeleton } from '../ui/skeleton'

const SectionLoading = () => {
	return (
		<Skeleton className='flex h-12 items-center justify-between px-2 py-4'>
			<div className='flex flex-1 items-center space-x-2'>
				<Skeleton className='size-4 bg-blue-500' />
				<Skeleton className='h-4 w-1/3 bg-blue-500' />
			</div>
			<Skeleton className='size-4 bg-blue-500' />
		</Skeleton>
	)
}

export default SectionLoading
