import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import UserBox from '@/components/shared/user-box'
import LanguageDropdown from './language-dropdown'
import { HiOutlineMenu } from 'react-icons/hi'

interface Props {
	isProfile?: boolean
	toggleSidebar?: () => void
}

function Navbar({ isProfile, toggleSidebar }: Props) {
	return (
		<div className='fixed inset-x-0 top-0 z-50 flex h-[10vh] items-center justify-between border-b bg-background px-2 lg:px-4'>
			<div className='flex items-center gap-2'>
				{/* Hamburger menu for mobile */}
				<button className='md:hidden p-2 text-2xl' onClick={toggleSidebar}>
					<HiOutlineMenu />
				</button>

				<Logo />
			</div>

			<div className='flex items-center gap-4'>
				{isProfile && <LanguageDropdown />}
				<ModeToggle />
				<UserBox />
			</div>
		</div>
	)
}

export default Navbar
