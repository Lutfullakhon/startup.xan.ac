'use client'

import { useRefresh } from '@/hooks/use-refresh'
import { Dialog, DialogContent } from '../ui/dialog'
import { Loader2 } from 'lucide-react'
import Countdown, { zeroPad } from 'react-countdown'

function RefreshModal() {
	const { isOpen } = useRefresh()

	const renderer = ({ seconds }: { seconds: number }) => (
		<span className='text-center font-space-grotesk text-5xl font-bold'>
			{zeroPad(seconds)}
		</span>
	)

	return (
		<Dialog open={isOpen}>
			<DialogContent>
				<div className='mt-4 flex items-center justify-center gap-1 text-sm uppercase opacity-70'>
					<Loader2 className='size-4 animate-spin' />
					<span>Checking</span>
				</div>
				<h1 className='text-center font-space-grotesk text-xl font-medium'>
					Please wait while we refresh your data
				</h1>
				<Countdown
					date={Date.now() + 8000}
					renderer={renderer}
					onComplete={() => location.reload()}
				/>
			</DialogContent>
		</Dialog>
	)
}

export default RefreshModal
