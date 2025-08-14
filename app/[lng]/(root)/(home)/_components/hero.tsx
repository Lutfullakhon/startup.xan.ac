'use client'

import { Button } from '@/components/ui/button'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel'
import { companies } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'

function Hero() {
	const t = useTranslate()

	return (
		<>
			<div className='container mx-auto grid min-h-[80vh] max-w-6xl grid-cols-2 gap-8 max-md:grid-cols-1 max-md:pt-32 max-md:px-4'>
				<div className='flex flex-col space-y-4 self-center'>
					<h1 className='font-space-grotesk text-5xl font-bold'>
						{t('heroTitle')}{' '}
						<span className='text-blue-500'>{t('heroTitleSpan')}</span>
					</h1>
					<p className='text-muted-foreground'>{t('heroDescription')}</p>
					<div className='flex gap-4'>
						<Link href={'/courses'}>
							<Button aria-label='find-courses' variant={'outline'} size={'lg'}>
								{t('findCourses')}
							</Button>
						</Link>
						<Link href={'/courses'}>
							<Button aria-label='blogs' size={'lg'}>
								{t('blogs')}
							</Button>
						</Link>
					</div>
				</div>

				<Image
					src={'/assets/hero.png'}
					alt='hero'
					width={520}
					height={520}
					sizes='(max-width: 520px) 100vw, (max-width: 520px) 50vw, 33vw'
					className='h-auto w-full self-end object-cover'
				/>
			</div>

			<div className='w-full bg-secondary'>
				<Carousel
					opts={{ align: 'start', loop: true }}
					className='container mx-auto w-full max-w-6xl'
					plugins={[Autoplay({ delay: 2000 })]}
				>
					<CarouselContent>
						{companies.map((Icon, idx) => (
							<CarouselItem
								key={idx}
								className='basis-1/3 md:basis-1/4 lg:basis-1/6'
							>
								<Icon className='h-24 w-full text-muted-foreground' />
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</>
	)
}

export default Hero
