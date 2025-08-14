import { Separator } from '@/components/ui/separator'
import Header from '../../../../components/shared/header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Profile from './_components/profile'
import Account from './_components/account'

import { getUserById } from '@/actions/user.action'
import { auth } from '@clerk/nextjs/server'

async function Page() {
	const { userId } = await auth()
	const userJSON = await getUserById(userId!)
	const user = JSON.parse(JSON.stringify(userJSON))

	return (
		<div className='px-3 sm:px-6 lg:px-12 max-w-7xl mx-auto w-full'>
			<Header title='Settings' description='Manage your account settings' />
			<Separator className='my-3 bg-muted-foreground' />

			<Tabs defaultValue='profile' className='w-full'>
				{/* Scrollable tabs on mobile */}
				<TabsList className='flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 w-full border-b pb-2'>
					<TabsTrigger
						value='profile'
						className='flex-shrink-0 min-w-[120px] sm:min-w-[150px] text-center'
					>
						Profile
					</TabsTrigger>
					<TabsTrigger
						value='account'
						className='flex-shrink-0 min-w-[120px] sm:min-w-[150px] text-center'
					>
						Account
					</TabsTrigger>
				</TabsList>

				<div className='mt-4 w-full'>
					<TabsContent value='profile' className='w-full'>
						<div className='bg-card p-4 rounded-xl shadow-sm'>
							<Profile />
						</div>
					</TabsContent>
					<TabsContent value='account' className='w-full'>
						<div className='bg-card p-4 rounded-xl shadow-sm'>
							<Account {...user} />
						</div>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	)
}

export default Page
