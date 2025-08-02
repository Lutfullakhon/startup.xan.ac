'use client'

import LanguageDropdown from '@/components/shared/language-dropdown'
import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import UserBox from '@/components/shared/user-box'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { profileNavLinks } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Sidebar() {
	const pathname = usePathname()
	const t = useTranslate()

	return (
		<div className='fixed inset-y-0 right-0 w-[400px] border-l bg-gradient-to-b from-background to-secondary p-4 max-md:w-20 max-md:px-2'>
			<div className='flex items-center justify-between max-md:hidden'>
				<Logo />

				<div className='flex items-center gap-1'>
					<ModeToggle />
					<LanguageDropdown />
					<UserBox />
				</div>
			</div>

			<Separator className='my-3 max-md:hidden' />

			<div className='flex flex-col space-y-3'>
				{profileNavLinks.map(item => (
					<Link href={item.route} key={item.route}>
						<Button
							className='flex w-full justify-start gap-2 max-md:w-fit max-md:justify-center'
							variant={pathname.slice(3) === item.route ? 'secondary' : 'ghost'}
						>
							<item.icon className='size-5 text-muted-foreground' />
							<span className='max-md:hidden'>{t(item.label)}</span>
						</Button>
					</Link>
				))}
				<Link href={'/'}>
					<Button
						className='flex w-full justify-start gap-2 max-md:w-fit max-md:justify-center md:hidden'
						variant={'destructive'}
					>
						<LogOut className='size-5 text-muted-foreground' />
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default Sidebar
