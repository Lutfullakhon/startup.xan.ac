import type { Metadata } from 'next'
import { Roboto, Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import './globals.css'
import { ChildProps } from '@/types'
import { ThemeProvider } from '@/components/providers/theme.providers'
import { languages } from '@/i18n/settings'
import { ClerkProvider } from '@clerk/nextjs'
import { dir } from 'i18next'
import { localization } from '@/lib/utils'
import { Toaster } from 'sonner'

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '300', '400', '500', '700', '900'],
})

const spaceGrotesk = SpaceGrotesk({
	variable: '--font-space-grotesk',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'XAN',
	description: 'Startup Next.js project',
	icons: { icon: '/logo.svg' },
}

export async function generateStaticParams() {
	return languages.map(lng => ({ lng }))
}

interface Props extends ChildProps {
	params: { lng: string }
}

async function RootLayout({ children, params }: Props) {
	// Await params if necessary (some Next.js versions expect this)
	const { lng } = await params
	const local = localization(lng)

	return (
		<ClerkProvider localization={local}>
			<html lang={lng} dir={dir(lng)} suppressHydrationWarning>
				<body
					className={`${roboto.variable} ${spaceGrotesk.variable} overflow-x-hidden`}
					suppressHydrationWarning
				>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<Toaster position='top-center' />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
