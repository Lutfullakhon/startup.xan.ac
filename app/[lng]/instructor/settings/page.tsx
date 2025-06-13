import { Separator } from '@/components/ui/separator'
import Header from '../_components/header'
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
		<>
			<Header title='Settings' description='Manage your account settings' />
			<Separator className='my-3 bg-muted-foreground' />
			<Tabs defaultValue='profile'>
				<TabsList>
					<TabsTrigger value='profile'>Profile</TabsTrigger>
					<TabsTrigger value='account'>Account</TabsTrigger>
				</TabsList>
				<TabsContent value='profile'>
					<Profile />
				</TabsContent>
				<TabsContent value='account'>
					<Account {...user} />
				</TabsContent>
			</Tabs>
		</>
	)
}

export default Page
