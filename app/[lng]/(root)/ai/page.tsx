'use client'

import TopBar from '@/components/shared/top-bar'
import { Button } from '@/components/ui/button'
import useTranslate from '@/hooks/use-translate'
import { Bot, CodeIcon, ImagePlus } from 'lucide-react'
import { useState } from 'react'
import Conversation from './_components/conversation'
import Code from './_components/code'
import ImageGenerator from './_components/image'

function Page() {
	const [status, setStatus] = useState('conv')

	const t = useTranslate()

	const arr = [
		{ label: 'conversation', icon: <Bot />, status: 'conv' },
		{ label: 'generateCode', icon: <CodeIcon />, status: 'code' },
		{ label: 'generateImage', icon: <ImagePlus />, status: 'image' },
	]

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
						{status === 'conv' && <Conversation />}
						{status === 'code' && <Code />}
						{status === 'image' && <ImageGenerator />}
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
