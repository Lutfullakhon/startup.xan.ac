import { getLesson } from '@/actions/lesson.action'
import { translation } from '@/i18n/server'
import parse from 'html-react-parser'
import VideoLesson from './_components/video-lesson'
import MobileCurriculum from './_components/mobile-curriculum'

export type Props = {
	params: Promise<{ lessonId: string; courseId: string; lng: string }>
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

async function Page({ params }: Props) {
	const { lessonId, courseId, lng } = await params

	const [{ t }, lesson] = await Promise.all([
		translation(lng),
		getLesson(lessonId),
	])

	// Handle case where lesson is not found
	if (!lesson) {
		return (
			<div className='p-6 text-center text-red-600'>
				<h1 className='text-2xl font-bold'>
					⚠️ {t('lessonNotFound') || 'Lesson not found'}
				</h1>
				<p>
					{t('tryAnotherLesson') ||
						'Please try another lesson or contact support.'}
				</p>
			</div>
		)
	}

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
