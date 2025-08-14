'use client'

import { SignOutButton } from '@clerk/nextjs'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import useTranslate from '@/hooks/use-translate'
import useUser from '@/hooks/use-user'

function UserBox() {
	const { user, isLoading } = useUser() // make sure your hook returns isLoading
	const t = useTranslate()

	// Wait until user is loaded
	if (isLoading || !user) return null

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar
					className='size-10 cursor-pointer'
					role='button'
					tabIndex={0}
					aria-label='user-menu'
				>
					<AvatarImage
						src={user?.picture || '/default-avatar.png'}
						className='object-cover'
						alt='Avatar'
					/>
					<AvatarFallback>
						{user?.fullName?.[0]?.toUpperCase() || 'U'}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-80'
				align='start'
				alignOffset={11}
				forceMount
			>
				<div className='flex flex-col space-y-4 p-2'>
					<p className='text-xs font-medium leading-none text-muted-foreground'>
						{user?.email}
					</p>

					<div className='flex items-center gap-x-2'>
						<div className='rounded-md bg-secondary p-1'>
							<Avatar className='size-8'>
								<AvatarImage src={user?.picture || '/default-avatar.png'} />
								<AvatarFallback>
									{user?.fullName?.[0]?.toUpperCase() || 'U'}
								</AvatarFallback>
							</Avatar>
						</div>

						<div className='space-y-1'>
							<p className='line-clamp-1 font-space-grotesk text-sm'>
								{user?.fullName}
							</p>
						</div>
					</div>
				</div>

				<DropdownMenuSeparator />

				{/* Admin link */}
				{user?.isAdmin && (
					<Link href={'/admin'}>
						<DropdownMenuItem className='w-full cursor-pointer text-muted-foreground'>
							{t('admin')}
						</DropdownMenuItem>
					</Link>
				)}

				{/* Instructor link */}
				{user?.role === 'instructor' && (
					<Link href={'/instructor'}>
						<DropdownMenuItem className='w-full cursor-pointer text-muted-foreground'>
							{t('instructor')}
						</DropdownMenuItem>
					</Link>
				)}

				{/* Manage Account */}
				<Link href={'/profile'}>
					<DropdownMenuItem className='w-full cursor-pointer text-muted-foreground'>
						{t('manageAccount')}
					</DropdownMenuItem>
				</Link>

				{/* Logout */}
				<DropdownMenuItem
					asChild
					className='w-full cursor-pointer text-muted-foreground'
				>
					<SignOutButton aria-label='logout'>{t('logout')}</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserBox
