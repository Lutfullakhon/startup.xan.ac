import { ILesson } from '@/app.types'
import { formatLessonTime } from '@/lib/utils'
import { Video } from 'lucide-react'

function LessonList(lesson: ILesson) {
	return (
		<div
			className='flex items-center justify-between py-2 hover:opacity-75'
			key={lesson._id}
			role='button'
		>
			<div className='flex items-center gap-2'>
				<Video />
				<p>{lesson.title}</p>
			</div>
			<p>{formatLessonTime(lesson)}</p>
		</div>
	)
}

export default LessonList
