import { getInstructors } from '@/actions/user.action'
import Header from '@/components/shared/header'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import Item from './_components/item'

async function Page() {
	const instructors = await getInstructors()

	return (
		<>
			<Header
				title='Instructors'
				description='Approve or disapprove them. You can also give them the admin role.'
			/>

			<Table className='mt-4 bg-background'>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>Role</TableHead>
						<TableHead className='w-[100px]'>Email</TableHead>
						<TableHead className='w-[100px]'>Portfolio</TableHead>
						<TableHead className='w-[100px]'>YouTube</TableHead>
						<TableHead className='w-[100px]'>Github</TableHead>
						<TableHead>Job</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{instructors.map(instructor => (
						<Item
							key={String(instructor._id)}
							item={JSON.parse(JSON.stringify(instructor))}
						/>
					))}
				</TableBody>
			</Table>
		</>
	)
}

export default Page
