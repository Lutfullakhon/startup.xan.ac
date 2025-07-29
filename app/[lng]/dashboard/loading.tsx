import SectionLoading from '@/components/shared/section-loading'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'

function Loading() {
	return (
		<div className='flex'>
			<Skeleton className='hidden h-[100vh] w-96 rounded-none bg-gray-200 dark:bg-gray-900 lg:block'>
				<div className='pt-4'>
					<Skeleton className='mx-auto h-[10vh] w-[90%]'>
						<div className='pl-2 pt-4'>
							<Skeleton className='h-[24px] w-[60%] bg-blue-500' />
						</div>
					</Skeleton>
				</div>
				<div className='mx-auto my-4 h-1 w-[90%] bg-secondary' />
				<div className='mx-auto mt-4 flex w-[90%] flex-col gap-4'>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
						<SectionLoading key={i} />
					))}
				</div>
			</Skeleton>
			<div className='w-full'>
				<Skeleton className='flex h-[10vh] w-full items-center justify-between rounded-none px-4'>
					<div className='flex items-center gap-1'>
						<Skeleton className='h-8 w-24 bg-gray-300 dark:bg-gray-900 lg:w-32' />
					</div>
					<div className='flex items-center gap-2'>
						<Skeleton className='size-8 bg-blue-500 lg:w-8' />
						<Skeleton className='size-8 bg-gray-300 dark:bg-gray-900 lg:w-8' />
						<Skeleton className='size-8 bg-blue-500 lg:w-8' />
						<Skeleton className='size-10 rounded-full bg-gray-300 dark:bg-gray-900 lg:size-12' />
					</div>
				</Skeleton>

				<div className='relative mx-auto mt-4 h-[20vh] w-[90%] bg-gray-200 dark:bg-gray-900 sm:h-[30] md:h-[50vh] lg:h-[75vh]'>
					<Skeleton className='absolute right-0 top-0 flex size-full items-center justify-center rounded-md bg-slate-500/20'>
						<Loader2 className='size-6 animate-spin text-blue-500' />
					</Skeleton>
				</div>

				<div className='block lg:hidden'>
					<div className='mx-auto mt-4 h-[10vh] w-[90%] rounded-md'>
						<Skeleton className='size-full rounded-md bg-gray-300 dark:bg-gray-900' />
					</div>
					<div className='mx-auto mt-4 flex w-[90%] flex-col space-y-3'>
						{[1, 2, 3, 4].map((_, i) => (
							<SectionLoading key={i} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Loading
