// app/[lng]/(root)/become-instructor/page.tsx
import TopBar from '@/components/shared/top-bar'
import Image from 'next/image'
import InstructorForm from './_components/instructor-form'
import { Metadata } from 'next'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Praktikum | Muallim boʻlish',
	description:
		'Praktikum platformasida muallim boʻlish uchun ariza qoldiring. Oʻzingizga mos kursni tuzing va oʻrganishni boshlang!',
}

type PageProps = {
	params: {
		lng: string
	}
}

export default async function Page({ params }: PageProps) {
	// Server-side: get current user
	const user = await currentUser()

	// If not signed in — server redirect to sign-up page (no client flicker)
	if (!user) {
		// Redirect to localized sign up route, e.g. /en/sign-up
		return redirect(`/${params.lng}/sign-up`)
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
