'use client'

import { usePathname } from 'next/navigation'
import { ChildProps } from '@/types'
import Navbar from './_components/navbar'
import Footer from './_components/footer'
import RefreshModal from '@/components/modals/refresh.modal'
import AiButton from '@/components/shared/ai-button'

function Layout({ children }: ChildProps) {
	const pathname = usePathname()

	// List of routes that should NOT render the layout (auth pages)
	const noLayoutRoutes = ['/sign-in', '/sign-up']

	// Check against i18n routes like /en/sign-in, /uz/sign-up
	const hideLayout = noLayoutRoutes.some(route => pathname?.includes(route))

	if (hideLayout) {
		// Skip Navbar and Footer for auth pages
		return <>{children}</>
	}

	return (
		<div>
			<Navbar />
			<main>{children}</main>
			<Footer />
			<RefreshModal />
			<AiButton />
		</div>
	)
}

export default Layout
