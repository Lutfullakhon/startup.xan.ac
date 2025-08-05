import TopBar from '@/components/shared/top-bar'
import Image from 'next/image'
import InstructorForm from './_components/instructor-form'
import { Metadata } from 'next'
import { currentUser } from '@clerk/nextjs/server'
import { RedirectToSignUp } from '@clerk/nextjs'

export const metadata: Metadata = {
	title: 'Praktikum | Muallim boʻlish',
	description:
		'Praktikum platformasida muallim boʻlish uchun ariza qoldiring. Oʻzingizga mos kursni tuzing va oʻrganishni boshlang!',
}

export default async function Page({ params }: { params: { lng: string } }) {
	const user = await currentUser()

	// 🔐 If user not signed in, redirect to SignUp with correct language
	if (!user) {
		return <RedirectToSignUp redirectUrl={`/${params.lng}/become-instructor`} />
	}

	return (
		<>
			<TopBar
				label='becomeInstructor'
				description='becomeInstructorDescription'
			/>

			<div className='container mx-auto mt-12 min-h-[50vh] max-w-6xl'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<InstructorForm />

					<Image
						src='/assets/instructor.png'
						alt='Instructor'
						width={430}
						height={430}
						className='self-end justify-self-end'
					/>
				</div>
			</div>
		</>
	)
}
