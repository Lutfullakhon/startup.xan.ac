'use client'

import { learningJourney } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import Image from 'next/image'

function LearningJourney() {
	const t = useTranslate()

	return (
		<div className='container mx-auto max-w-6xl py-24'>
			<h1 className='text-center font-space-grotesk text-2xl font-bold'>
				{t('learnJourney')}
			</h1>
			<p className='mx-auto max-w-4xl text-center text-sm text-muted-foreground'>
				{t('learnJourneyDescription')}
			</p>

			<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{learningJourney.map(item => (
					<div
						key={item.title}
						className='flex flex-col items-center justify-center rounded-md bg-secondary p-6 text-center'
					>
						<Image src={item.image} alt={item.title} width={70} height={70} />
						<h2 className='mt-2 line-clamp-1 font-space-grotesk text-lg font-bold'>
							{t(item.title)}
						</h2>
						<p className='line-clamp-2 text-sm text-white/80'>
							{t(item.excerpt)}
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default LearningJourney
