// app/[lng]/(root)/instructors/page.tsx
import { getAdminInstructors } from '@/actions/user.action'
import InstructorCard from '@/components/cards/instructor.card'
import Pagination from '@/components/shared/pagination'
import TopBar from '@/components/shared/top-bar'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Praktikum | Barcha muallimlar',
	description:
		'Platformamizda mavjud boʻlgan barcha muallimlar roʻyxati. Oʻzingizga mos muallimni toping va oʻrganishni boshlang!',
}

/**
 * NOTE: in Next.js v15 `params` and `searchParams` are promises
 * and must be awaited before using. See Next.js docs.
 */
export type Props = {
	params: Promise<{ lng: string }>
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: Props) {
	// await searchParams (may be undefined)
	const resolvedSearch = searchParams ? await searchParams : undefined
	const page =
		resolvedSearch && typeof resolvedSearch.page === 'string'
			? parseInt(resolvedSearch.page, 10)
			: 1

	const instructorData = await getAdminInstructors({ page, pageSize: 8 })

	// Convert mongoose documents / ObjectIds / Dates to plain serializable objects
	const instructors = (instructorData.instructors || []).map(inst => {
		// JSON stringify/parse is the simplest safe conversion here
		const obj = JSON.parse(JSON.stringify(inst))

		// ensure _id is a string (defensive)
		if (obj && obj._id && typeof obj._id !== 'string') {
			obj._id = String(obj._id)
		}

		// normalize dates to ISO strings if present
		if (obj && obj.createdAt)
			obj.createdAt = new Date(obj.createdAt).toISOString()
		if (obj && obj.updatedAt)
			obj.updatedAt = new Date(obj.updatedAt).toISOString()

		return obj
	})

	return (
		<>
			<TopBar label='allInstructors' description='allInstructorsDescription' />

			<div className='container mx-auto mt-12 max-w-6xl'>
				<div className='mt-4 grid grid-cols-4 gap-4'>
					{instructors.map(instructor => (
						<InstructorCard
							key={instructor._id}
							// InstructorCard is likely a client component — pass a plain object
							instructor={instructor}
						/>
					))}
				</div>

				<div className='mt-4'>
					<Pagination isNext={instructorData.isNext} pageNumber={page} />
				</div>
			</div>
		</>
	)
}
