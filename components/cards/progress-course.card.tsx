'use client'

import { ICourse } from '@/app.types'
import useTranslate from '@/hooks/use-translate'
import Image from 'next/image'
import Link from 'next/link'
import { Progress } from '../ui/progress'

interface Props {
	course: ICourse
	progress: number
}
function ProgressCourseCard({ course, progress }: Props) {
	const t = useTranslate()

	return (
		<Link href={`/dashboard/${course._id}`}>
			<div className='rounded-md border bg-background p-2'>
				<div className='relative h-40 w-[100%]'>
					<Image src={course.previewImage} alt={course.title} fill />

					<div className='absolute bottom-0 right-0 flex items-center gap-2 rounded-tl-lg bg-blue-500/50 px-2 py-1'>
						<p className='font-space-grotesk text-sm font-bold text-white'>
							{course.category}
						</p>
					</div>
				</div>
				<h2 className='mt-2 line-clamp-1 font-space-grotesk font-bold'>
					{course.title}
				</h2>
				<Progress value={progress} className='mt-2 h-3' />
				<div className='mt-2 text-sm font-bold opacity-50'>
					{progress ? progress.toFixed(0) : 0}% {t('completed')}
				</div>
			</div>
		</Link>
	)
}

export default ProgressCourseCard
