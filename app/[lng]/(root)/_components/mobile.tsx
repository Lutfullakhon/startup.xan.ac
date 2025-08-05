'use client'

import React from 'react'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { AlignCenter, ShoppingCart } from 'lucide-react'
import Logo from '@/components/shared/logo'
import { Separator } from '@/components/ui/separator'
import { navLinks } from '@/constants'
import Link from 'next/link'
import useTranslate from '@/hooks/use-translate'

import LanguageDropdown from '@/components/shared/language-dropdown'
import GlobalSearch from './global-search'
import ModeToggle from '@/components/shared/mode-toggle'

function Mobile() {
	const t = useTranslate()
	return (
		<Sheet>
			<SheetTrigger asChild className='md:hidden'>
				<Button
					size={'icon'}
					variant={'ghost'}
					aria-label='mobile-hamburger-menu'
				>
					<AlignCenter />
				</Button>
			</SheetTrigger>
			<SheetContent side='top'>
				<SheetHeader>
					<SheetTitle>
						<Logo />
						<Separator />
					</SheetTitle>
				</SheetHeader>
				<div className='mt-4 flex flex-col space-y-3'>
					{navLinks.map(nav => (
						<Link
							href={`/${nav.route}`}
							key={nav.route}
							className='flex h-12 cursor-pointer items-center gap-2 rounded-sm px-3 transition-colors hover:bg-blue-400/20'
						>
							<nav.icon className='size-5' /> <span>{t(nav.name)}</span>
						</Link>
					))}
					<LanguageDropdown isMobile />
					<div className='flex items-center justify-center gap-4'>
						<Button size={'icon'} variant={'ghost'}>
							<ShoppingCart />
						</Button>
						<GlobalSearch />
						<ModeToggle />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default Mobile
