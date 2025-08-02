import { getIsPurchase } from '@/actions/course.action'
import { getLastLesson } from '@/actions/lesson.action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface Props {
	params: Promise<{ courseId: string; lng: string }>
}
async function Page({ params }: Props) {
	const { courseId, lng } = await params

	const { userId } = await auth()
	const isPurchase = await getIsPurchase(userId!, courseId)

	if (!isPurchase) return redirect(`/course/${courseId}`)

	const { lessonId, sectionId } = await getLastLesson(userId!, courseId)

	return redirect(`/${lng}/dashboard/${courseId}/${lessonId}?s=${sectionId}`)
}

export default Page
