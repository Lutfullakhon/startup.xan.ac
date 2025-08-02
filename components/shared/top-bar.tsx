'use client'

import useTranslate from '@/hooks/use-translate'
import { Dot } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
	label: string
	extra?: string
	description?: string
}

function TopBar({ label, extra, description }: Props) {
	const searchParams = useSearchParams()
	const t = useTranslate()

	return (
		<>
			<div className='mt-20 h-12 bg-gradient-to-r from-secondary to-background'>
				<div className='container  mx-auto flex w-full max-w-6xl items-center'>
					<div className='flex items-center'>
						<Link
							href={'/'}
							className='opacity-80 transition-opacity hover:opacity-95'
						>
							{t('home')}
						</Link>
						<Dot className='size-12 text-muted-foreground ' />
						<p>{t(label)}</p>
						{extra && (
							<>
								<Dot className='size-12 text-muted-foreground ' />
								<p>{t(extra)}</p>
							</>
						)}
					</div>
				</div>
			</div>

			{description && (
				<div className='container mx-auto my-12 max-w-6xl'>
					<h1 className='font-space-grotesk text-4xl font-bold'>{t(label)}</h1>
					<p className='mt-2 max-w-md text-muted-foreground'>
						{t(description)}
					</p>
				</div>
			)}
		</>
	)
}

export default TopBar
