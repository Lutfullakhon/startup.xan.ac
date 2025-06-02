'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import useTranslate from '@/hooks/use-translate'
import dynamic from 'next/dynamic'

// Dynamically import ReactStars with SSR disabled
const ReactStars = dynamic(() => import('react-stars'), { ssr: false })

function ReviewCard() {
	const t = useTranslate()

	return (
		<div className='mt-6 border-t border-t-secondary'>
			<div className='mt-8 flex gap-2'>
				<Avatar>
					<AvatarImage src='https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg=' />
					<AvatarFallback className='uppercase'>sb</AvatarFallback>
				</Avatar>

				<div className='flex flex-col'>
					<div>Jony Doe</div>
					<div className='flex items-center gap-1'>
						<ReactStars value={4.6} edit={false} color2='#DD6B20' />
						<p className='text-sm opacity-50'>5 m {t('ago')}</p>
					</div>
				</div>
			</div>

			<div className='mt-2'>kurs prosta olov</div>
		</div>
	)
}

export default ReviewCard
