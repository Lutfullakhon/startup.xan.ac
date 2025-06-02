'use client'

import useTranslate from '@/hooks/use-translate'
import Image from 'next/image'
import React from 'react'
import ReactStars from 'react-stars'
import { PiStudentBold } from 'react-icons/pi'
import { Clock3 } from 'lucide-react'

function Hero() {
	const t = useTranslate()

	return (
		<>
			<h1 className='font-space-grotesk text-4xl font-bold'>
				ReactJS full course
			</h1>

			<p className='mt-4 text-muted-foreground'>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste adipisci
				corrupti suscipit quos dolorum ab.
			</p>

			<div className='mt-4 flex flex-wrap items-center gap-6'>
				<div className='flex items-center gap-2'>
					<Image
						width={50}
						height={50}
						alt='author'
						src={
							'https://media.istockphoto.com/id/1682296067/photo/happy-studio-portrait-or-professional-man-real-estate-agent-or-asian-businessman-smile-for.jpg?s=612x612&w=0&k=20&c=9zbG2-9fl741fbTWw5fNgcEEe4ll-JegrGlQQ6m54rg='
						}
						className='rounded-full'
					/>
					<p className='font-space-grotesk font-bold'>Diyor Turdimuradov</p>
				</div>

				<div className='flex items-center gap-2 font-space-grotesk'>
					<p className='font-bold text-[#E59819]'>4.5</p>
					<ReactStars value={4.5} edit={false} color2='#E59819' />
					<p className='font-bold'>(199)</p>
				</div>

				<div className='flex items-center gap-2'>
					<PiStudentBold className='size-6' />
					<p className='font-space-grotesk font-bold'>
						80
						{/* {course.purchasedStudents} {t('students')} */}
					</p>
				</div>

				<div className='flex items-center gap-2'>
					<Clock3 className='size-6' />
					<p className='font-space-grotesk font-bold'>
						{t('lastUpdated')} 11/2024
						{/* {format(new Date(course.updatedAt), 'MM/yyyy')} */}
					</p>
				</div>
			</div>

			<Image
				src={
					'https://sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F35ca3db9-fb43-4f12-bd48-8b08a503db09-kilwwj.png&w=1920&q=75'
				}
				alt='course'
				width={1920}
				height={1080}
				className='mt-4 rounded-md object-cover'
			/>
		</>
	)
}

export default Hero
