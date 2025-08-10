'use client'

import TopBar from '@/components/shared/top-bar'
import { Button } from '@/components/ui/button'
import useTranslate from '@/hooks/use-translate'
import { Bot, CodeIcon, ImagePlus } from 'lucide-react'
import { Suspense, useState, useEffect } from 'react' // Added useEffect
import Conversation from './_components/conversation'
import Code from './_components/code'
import ImageGenerator from './_components/image'

function Page() {
	const [status, setStatus] = useState<string | null>(null) // Initialize as null
	const [isClient, setIsClient] = useState(false) // Track client-side state

	const t = useTranslate()

	const arr = [
		{ label: 'conversation', icon: <Bot />, status: 'conv' },
		{ label: 'generateCode', icon: <CodeIcon />, status: 'code' },
		{ label: 'generateImage', icon: <ImagePlus />, status: 'image' },
	]

	// Fix 1: Ensure this only runs on client
	useEffect(() => {
		setIsClient(true)
		setStatus('conv') // Set initial status after mount
	}, [])

	// Fix 2: Handle loading state
	if (!isClient || status === null) {
		return (
			<div className='flex h-screen w-full items-center justify-center'>
				<div className='h-12 w-12 animate-spin rounded-full border-t-2 border-primary'></div>
			</div>
		)
	}

	return (
		<>
			<TopBar label='Open AI' />

			<div className='container mx-auto max-w-6xl py-4'>
				<div className='flex gap-4 max-md:flex-col'>
					<div className='w-56 max-md:w-full'>
						<div className='flex flex-col space-y-2 rounded-md bg-gradient-to-b from-primary to-background px-2 py-4'>
							{arr.map(item => (
								<Button
									key={item.status}
									className='justify-start gap-2 font-space-grotesk font-bold'
									variant={status === item.status ? 'default' : 'secondary'}
									onClick={() => setStatus(item.status)}
								>
									{item.icon}
									<span>{t(item.label)}</span>
								</Button>
							))}
						</div>
					</div>

					<div className='custom-scrollbar relative min-h-[70vh] flex-1 rounded-md bg-gradient-to-t from-background to-secondary pb-16'>
						{/* Fix 3: Added proper fallbacks */}
						<Suspense
							fallback={
								<div className='flex h-full items-center justify-center'>
									<div className='h-8 w-8 animate-spin rounded-full border-t-2 border-primary'></div>
								</div>
							}
						>
							{status === 'conv' && <Conversation />}
							{status === 'code' && <Code />}
							{status === 'image' && <ImageGenerator />}
						</Suspense>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
