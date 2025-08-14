'use client'

import { sendNotification } from '@/actions/notification.action'
import { deleteUser, updateUser } from '@/actions/user.action'
import { IUser } from '@/app.types'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

interface Props {
	item: IUser
}

function Item({ item }: Props) {
	const pathname = usePathname()

	const onRoleChange = async () => {
		const msg = item.role === 'instructor' ? 'Disapprove' : 'Approve'
		const isConfirmed = confirm(`Are you sure you want to ${msg} this user?`)

		if (isConfirmed) {
			const upd = updateUser({
				clerkId: item.clerkId,
				updatedData: { role: item.role === 'user' ? 'instructor' : 'user' },
				path: pathname,
			})

			const not = sendNotification(
				item.clerkId,
				`messageRoleChanged ${item.role === 'user' ? 'instructor' : 'user'}`
			)

			const promise = Promise.all([upd, not])

			toast.promise(promise, {
				loading: 'Loading...',
				success: `${msg} successfully.`,
				error: 'Something went wrong. Please try again.',
			})
		}
	}

	const onAdmin = async () => {
		const isConfirmed = confirm(
			`Are you sure you want to make this user an admin?`
		)

		if (isConfirmed) {
			const upd = updateUser({
				clerkId: item.clerkId,
				updatedData: { isAdmin: !item.isAdmin },
				path: pathname,
			})

			const not = sendNotification(
				item.clerkId,
				item.isAdmin ? 'messageYoureNotAdmin' : 'messageYoureAdmin'
			)

			const promise = Promise.all([upd, not])

			toast.promise(promise, {
				loading: 'Loading...',
				success: `Successfully!`,
				error: 'Something went wrong. Please try again.',
			})
		}
	}

	const onDelete = async () => {
		const isConfirmed = confirm(
			`Are you sure you want to delete this user? All their courses, reviews, and related data will be removed.`
		)

		if (isConfirmed) {
			const promise = deleteUser(item.clerkId, true, pathname) // true = using clerkId

			toast.promise(promise, {
				loading: 'Deleting user...',
				success: `User deleted successfully!`,
				error: 'Something went wrong. Please try again.',
			})
		}
	}

	// Helper to safely format a link or show fallback text
	const formatLink = (url?: string | null) => {
		if (!url) return 'No link'
		return url.replace(/^https?:\/\//, '')
	}

	// Helper to open a link if it exists
	const openLink = (url?: string | null) => {
		if (url) window.open(url, '_blank')
	}

	return (
		<TableRow>
			<TableCell className='text-xs capitalize'>
				{item.isAdmin ? 'Admin/' : ''}
				{item.role ?? 'N/A'}
			</TableCell>

			<TableCell className='text-xs'>{item.email ?? 'No email'}</TableCell>

			<TableCell
				className='cursor-pointer text-xs text-primary hover:underline'
				onClick={() => openLink(item.website)}
			>
				{formatLink(item.website)}
			</TableCell>

			<TableCell
				className='cursor-pointer text-xs text-primary hover:underline'
				onClick={() => openLink(item.youtube)}
			>
				{formatLink(item.youtube)}
			</TableCell>

			<TableCell
				className='cursor-pointer text-xs text-primary hover:underline'
				onClick={() => openLink(item.github)}
			>
				{formatLink(item.github)}
			</TableCell>

			<TableCell className='text-xs'>{item.job ?? 'N/A'}</TableCell>

			<TableCell className='text-right'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size={'icon'} variant={'ghost'}>
							<MoreHorizontal className='size-6' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Manage</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={onRoleChange}>
							{item.role === 'instructor' ? 'Disapprove' : 'Approve'}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onAdmin}>
							{item.isAdmin ? 'Remove admin' : 'Make admin'}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	)
}

export default Item
