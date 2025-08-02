'use client'

import { ICard } from '@/app.types'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import useTranslate from '@/hooks/use-translate'

function CreditCard({ card }: { card: ICard }) {
	const t = useTranslate()

	return (
		<Card className='relative h-64 max-md:h-56'>
			<CardContent className='relative z-50 flex h-full flex-col justify-between py-4'>
				<div className='flex items-center justify-between'>
					<Image src={'/assets/chip.png'} alt='chip' width={50} height={50} />
					<h1 className='font-space-grotesk text-2xl font-bold capitalize italic'>
						{card.card.brand}
					</h1>
				</div>

				<div className='flex items-center justify-center gap-4 font-space-grotesk text-4xl max-md:text-2xl'>
					<div>****</div>
					<div>****</div>
					<div>****</div>
					<div>{card.card.last4}</div>
				</div>

				<div className='flex items-center justify-between'>
					<div className='flex flex-col'>
						<h3 className='text-sm font-bold'>{t('cardHolder')}</h3>
						<p className='font-space-grotesk text-2xl font-bold capitalize max-md:text-xl'>
							{card.billing_details.name}
						</p>
					</div>

					<div className='flex flex-col'>
						<h3 className='text-sm font-bold'>{t('validTill')}</h3>
						<p className='font-space-grotesk text-2xl font-bold capitalize max-md:text-xl'>
							{card.card.exp_month}/{card.card.exp_year}
						</p>
					</div>
				</div>
			</CardContent>
			<div className='absolute inset-0 z-40 bg-background/50' />
			<Image
				fill
				alt='map'
				className='z-30 object-cover'
				src={'/assets/map.png'}
			/>
		</Card>
	)
}

export default CreditCard
