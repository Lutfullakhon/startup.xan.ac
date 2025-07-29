import { getLesson } from '@/actions/lesson.action'
import { translation } from '@/i18n/server'
import parse from 'html-react-parser'
import VideoLesson from './_components/video-lesson'
import MobileCurriculum from './_components/mobile-curriculum'

interface Props {
	params: { lessonId: string; courseId: string; lng: string }
}

async function Page({ params }: Props) {
	// Destructure params after awaiting
	const { courseId, lessonId, lng } = params

	// Await all async operations
	const [{ t }, lesson] = await Promise.all([
		translation(lng),
		getLesson(lessonId),
	])

	return (
		<>
			<VideoLesson lesson={JSON.parse(JSON.stringify(lesson))} />
			{lesson.content && (
				<div className='rounded-md bg-gradient-to-b from-background to-secondary px-4 pb-4 pt-1 md:px-8'>
					<h1 className='mb-2 font-space-grotesk text-xl font-medium text-primary'>
						{t('usefullInformation')}
					</h1>
					<div className='prose max-w-none flex-1 dark:prose-invert'>
						{parse(lesson.content)}
					</div>
				</div>
			)}
			<div className='block lg:hidden'>
				<MobileCurriculum courseId={courseId} lng={lng} />
			</div>
		</>
	)
}

export default Page
