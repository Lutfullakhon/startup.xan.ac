'use client'

import React from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { Languages } from 'lucide-react'
import Image from 'next/image'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { lngs } from '@/constants'
import Link from 'next/link'

import { useParams, usePathname } from 'next/navigation'
import { cn, getCurrentLng } from '@/lib/utils'

interface Props {
	isMobile?: boolean
}

function LanguageDropdown({ isMobile = false }: Props) {
	const { lng } = useParams()
	const pathname = usePathname()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant={'ghost'}
					size={'icon'}
					className={cn(
						isMobile && 'w-full h-12 bg-primary text-primary-foreground'
					)}
					aria-label='language-dropdown'
				>
					<Languages />
					{isMobile && (
						<span className='font-space-grotesk font-medium'>
							{getCurrentLng(lng as string)}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuGroup>
					{lngs.map(item => (
						<Link key={item.route} href={`/${item.route}/${pathname.slice(4)}`}>
							<DropdownMenuItem
								key={item.route}
								className={cn(
									'cursor-pointer',
									lng === item.route && 'bg-secondary'
								)}
							>
								<Image
									src={`/assets/locales/${item.route}.png`}
									alt={item.label}
									width={30}
									height={30}
								/>
								<span className='ml-2 font-space-grotesk font-medium'>
									{item.label}
								</span>
							</DropdownMenuItem>
						</Link>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default LanguageDropdown
