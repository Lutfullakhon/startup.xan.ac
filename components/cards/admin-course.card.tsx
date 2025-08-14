'use client'

import Image from 'next/image'
import { Card, CardContent } from '../ui/card'
import { ICourse } from '@/app.types'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { updateCourse } from '@/actions/course.action'
import { sendNotification } from '@/actions/notification.action'
import { toast } from 'sonner'

function AdminCourseCard({ course }: { course: ICourse }) {
	const pathname = usePathname()

	const onToggleStatus = () => {
		let upd: Promise<void>
		let not: Promise<void> | undefined
		const instructorId = course.instructor?.clerkId

		if (course.published) {
			upd = updateCourse(course._id, { published: false }, pathname)
			if (instructorId) {
				not = sendNotification(instructorId, 'messageCourseUnpublished')
			}
		} else {
			upd = updateCourse(course._id, { published: true }, pathname)
			if (instructorId) {
				not = sendNotification(instructorId, 'messageCoursePublished')
			}
		}

		// Always return Promise<void> for toast.promise
		const promise: Promise<void> = not
			? Promise.all([upd, not]).then(() => {})
			: upd

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully updated!',
			error: 'Something went wrong!',
		})
	}

	return (
		<Card className='w-full'>
			<CardContent className='relative h-56 w-full'>
				<Image
					fill
					src={course.previewImage}
					alt={course.title}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					className='rounded-md object-cover'
				/>
			</CardContent>

			<div className='my-4 flex flex-col space-y-2 px-2'>
				<h2 className='line-clamp-1 font-space-grotesk text-2xl font-bold'>
					{course.title}
				</h2>

				<Separator />

				<div className='flex flex-wrap items-center justify-between gap-3'>
					<div className='flex min-w-0 flex-shrink items-center gap-2'>
						<Image
							src={course.instructor?.picture || '/default-avatar.png'}
							alt={course.instructor?.fullName || 'Instructor'}
							width={40}
							height={40}
							sizes='40px'
							className='rounded-full object-cover'
						/>
						<p className='truncate text-sm text-muted-foreground max-w-[150px] sm:max-w-[200px]'>
							{course.instructor?.fullName || 'Unknown Instructor'}
						</p>
					</div>

					<Button
						className='w-full sm:w-auto font-space-grotesk font-bold'
						size='sm'
						variant={course.published ? 'destructive' : 'default'}
						onClick={onToggleStatus}
					>
						{course.published ? 'Unpublish' : 'Publish'}
					</Button>
				</div>
			</div>
		</Card>
	)
}

export default AdminCourseCard
