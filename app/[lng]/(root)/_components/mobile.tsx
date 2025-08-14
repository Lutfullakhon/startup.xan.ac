'use client'

import React, { Suspense, useState } from 'react'
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
import { useCart } from '@/hooks/use-cart'

import LanguageDropdown from '@/components/shared/language-dropdown'
import GlobalSearch from './global-search'
import ModeToggle from '@/components/shared/mode-toggle'

function Mobile() {
	const t = useTranslate()
	const { cartsLength } = useCart()
	const [open, setOpen] = useState(false) // <-- add sheet state

	return (
		<Sheet open={open} onOpenChange={setOpen}>
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
							onClick={() => setOpen(false)} // <-- close sheet on link click
						>
							<nav.icon className='size-5' /> <span>{t(nav.name)}</span>
						</Link>
					))}

					<LanguageDropdown isMobile />

					<div className='flex items-center justify-center gap-4'>
						<Suspense fallback={null}>
							<GlobalSearch closeMenu={() => setOpen(false)} />
						</Suspense>
						<Button
							size={'icon'}
							variant={cartsLength() ? 'secondary' : 'ghost'}
							asChild
							className='relative'
						>
							<Link
								href={'/shopping/cart'}
								aria-label='shopping-cart'
								onClick={() => setOpen(false)}
							>
								<ShoppingCart />
								{cartsLength() ? (
									<div className='absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-destructive'>
										{cartsLength()}
									</div>
								) : null}
							</Link>
						</Button>
						<ModeToggle />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export default Mobile
