'use client'

import { Button } from '@/components/ui/button'
import { adminNavLinks, instructorNavLinks, profileNavLinks } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface Props {
	page: 'admin' | 'instructor' | 'user'
	isOpen: boolean
	closeSidebar: () => void
}

function Sidebar({ page, isOpen, closeSidebar }: Props) {
	const pathname = usePathname()
	const t = useTranslate()
	const sidebarRef = useRef<HTMLDivElement>(null)

	const getNavLinks = () => {
		if (page === 'admin') return adminNavLinks
		if (page === 'instructor') return instructorNavLinks
		return profileNavLinks
	}

	const handleLinkClick = () => {
		if (window.innerWidth < 768) closeSidebar()
	}

	// Click-away to close sidebar **only when menu is open**
	useEffect(() => {
		if (!isOpen) return

		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				closeSidebar()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isOpen, closeSidebar])

	return (
		<div
			ref={sidebarRef}
			className={`fixed top-[12vh] left-0 h-[88vh] w-[300px] bg-background shadow-md z-50 transform transition-transform duration-300
        md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
		>
			<div className='mt-6 px-4'>
				{getNavLinks().map(item => (
					<Link key={item.route} href={item.route} onClick={handleLinkClick}>
						<Button
							className='flex w-full justify-start gap-2'
							variant={pathname.slice(3) === item.route ? 'secondary' : 'ghost'}
						>
							<item.icon className='size-5 text-muted-foreground' />
							<span>{t(item.label)}</span>
						</Button>
					</Link>
				))}

				<Button
					className='flex w-full justify-start gap-2 mt-4'
					variant='destructive'
					onClick={handleLinkClick}
				>
					<Link href='/'>
						<LogOut className='size-5 text-muted-foreground' />
					</Link>
				</Button>
			</div>
		</div>
	)
}

export default Sidebar
