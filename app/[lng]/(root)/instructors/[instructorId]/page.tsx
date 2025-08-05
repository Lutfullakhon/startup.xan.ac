import { getCourses } from '@/actions/course.action'
import { getUserById } from '@/actions/user.action'
import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import Image from 'next/image'
import { FaList } from 'react-icons/fa'
import { PiStudentBold } from 'react-icons/pi'
import SocialMedia from './_components/social-media'
import NoResult from '@/components/shared/no-result'
import CourseCard from '@/components/cards/course.card'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata({ params }: Props) {
	const user = await getUserById(params.instructorId)

	if (!user) {
		return {
			title: 'Instructor not found',
			description: 'This instructor does not exist.',
		}
	}

	return {
		title: `Muallim: ${user.fullName}`,
		description: `Muallim haqida ma'lumot: ${user.bio}`,
		openGraph: {
			images: user.picture,
			title: `Muallim: ${user.fullName}`,
			description: `Muallim haqida ma'lumot: ${user.bio}`,
		},
	}
}

export type Props = {
	params: { lng: string; instructorId: string }
	searchParams?: { [key: string]: string | string[] | undefined }
}

async function Page({ params, searchParams }: Props) {
	const { t } = await translation(params.lng)

	const page = searchParams?.page ? +searchParams.page : 1

	const user = await getUserById(params.instructorId)

	if (!user) {
		throw new Error('User not found')
	}
	const result = await getCourses({
		clerkId: params.instructorId,
		page,
		pageSize: 6,
	})

	return (
		<>
			<TopBar label='singleInstructor' extra={user.fullName} />

			<div className='container mx-auto mt-12 max-w-6xl'>
				<div className='mt-6 flex items-center gap-6 max-md:flex-col'>
					<Image
						src={user.picture}
						alt={user.fullName}
						width='155'
						height='155'
						className='rounded-md max-md:self-start'
					/>
					<div className='flex flex-1 flex-col space-y-2'>
						<h2 className='font-space-grotesk text-3xl font-bold'>
							{user.fullName}
						</h2>
						<p className='line-clamp-2 text-muted-foreground'>{user.bio}</p>
						<div className='flex items-center gap-4'>
							<div className='flex items-center gap-1'>
								<PiStudentBold />
								<span className='font-space-grotesk font-bold'>
									{result.totalStudents} {t('students')}
								</span>
							</div>
							<div className='flex items-center gap-1'>
								<FaList />
								<span className='font-space-grotesk font-bold'>
									{result.totalCourses} {t('courses')}
								</span>
							</div>
						</div>
						<SocialMedia user={JSON.parse(JSON.stringify(user))} />
					</div>
				</div>

				<h1 className='mt-4 text-center font-space-grotesk text-4xl font-bold'>
					{t('allCourses')}
				</h1>

				{result.courses.length === 0 && (
					<NoResult
						title={t('noCourses')}
						description={t('noCourseDescription')}
					/>
				)}

				<div className='mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{result.courses.map((course, index) => {
						const data = JSON.parse(JSON.stringify(course))
						return <CourseCard key={index} {...data} />
					})}
				</div>
			</div>
		</>
	)
}

export default Page
