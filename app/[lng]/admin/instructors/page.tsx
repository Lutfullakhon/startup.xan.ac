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

export const revalidate = 60

async function Page() {
	const instructors = (await getInstructors()) || []

	return (
		<>
			<Header
				title='Instructors'
				description='Approve or disapprove them. You can also give them the admin role.'
			/>

			<div className='mt-4 overflow-x-auto rounded-lg border border-border'>
				<Table className='min-w-[700px] bg-background'>
					<TableHeader>
						<TableRow>
							<TableHead className='whitespace-nowrap'>Role</TableHead>
							<TableHead className='whitespace-nowrap'>Email</TableHead>
							<TableHead className='whitespace-nowrap'>Portfolio</TableHead>
							<TableHead className='whitespace-nowrap'>YouTube</TableHead>
							<TableHead className='whitespace-nowrap'>Github</TableHead>
							<TableHead className='whitespace-nowrap'>Job</TableHead>
							<TableHead className='whitespace-nowrap text-right'>
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{instructors.length > 0 ? (
							instructors.map(instructor => (
								<Item
									key={String(instructor?._id || Math.random())}
									item={JSON.parse(JSON.stringify(instructor || {}))}
								/>
							))
						) : (
							<TableRow>
								<td
									colSpan={7}
									className='py-4 text-center text-sm text-muted-foreground'
								>
									No instructors found
								</td>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	)
}

export default Page
