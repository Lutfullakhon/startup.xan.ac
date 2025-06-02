import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import UserBox from '@/components/shared/user-box'
import React from 'react'

function Navbar() {
	return (
		<div className='fixed inset-0 z-50 flex h-[10vh] justify-between border-b bg-background px-2 lg:px-4'>
			<Logo />
			<div className='flex items-center gap-4'>
				<ModeToggle />
				<UserBox />
			</div>
		</div>
	)
}

export default Navbar
