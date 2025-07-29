'use client'

import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import UserBox from '@/components/shared/user-box'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useTranslate from '@/hooks/use-translate'
import { MoreVertical, Star } from 'lucide-react'
import DropdownContent from './dropdown-content'
import { useReview } from '@/hooks/use-review'

function Navbar() {
	const { onOpen } = useReview()
	const t = useTranslate()

	return (
		<div className='fixed inset-x-0 top-0 z-50 flex h-[10vh] w-full items-center justify-between border-b bg-gray-100 px-2 dark:bg-gray-900 lg:pl-80'>
			<div className='ml-2'>
				<Logo />
			</div>

			<div className='mr-4 flex items-center space-x-2'>
				<div
					className='hidden cursor-pointer items-center gap-1 opacity-50 transition-all duration-200 hover:opacity-100 md:flex'
					role='button'
					onClick={onOpen}
				>
					<Star size={20} />
					<p>{t('evaluation')}</p>
				</div>
				<ModeToggle />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size={'icon'} variant={'ghost'}>
							<MoreVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownContent />
				</DropdownMenu>
				<UserBox />
			</div>
		</div>
	)
}

export default Navbar
