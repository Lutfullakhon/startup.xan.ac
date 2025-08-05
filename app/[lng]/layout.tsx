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
	metadataBase: new URL('https://startup.xan.ac'),
	title: 'XAN',
	description:
		"Xan.ac Next.js dasturlash kurslari, amaliyotlar, startup loyihalar va asosiysi sifatli ta'limdir.",
	authors: [{ name: 'Lutfullaxon Anvarov', url: 'https://startup.xan.ac' }],
	icons: { icon: '/logo.svg' },
	openGraph: {
		title: 'Sammi praktikum | Dasturlash kurslari',
		description:
			"Xan Praktikum Next.js dasturlash kurslari, amaliyotlar, startup loyihalar va asosiysi sifatli ta'limdir.",
		type: 'website',
		url: 'https://startup.xan.ac',
		locale: 'uz_UZ',
		images:
			'https://res.cloudinary.com/dyqdtrwhj/image/upload/v1749477572/tcqxoppggln6jroorygv.webp',
		countryName: 'Uzbekistan',
		siteName: 'Xan',
		emails: 'info@xan.ac',
	},
	keywords:
		"Praktikum, Praktikum xan, NextJS, NextJS to'liq kurs, NextJS kurs, NextJS dasturlash, Startup, Startup loyiha, Startup xan, Xan, Xan praktikum, Xan dasturlash, Xan startup, Xan kurs, Xan kurslari, Xan dasturlash kurslari, Xan startup kurslari, Xan startup loyihalari, Sammi startup loyiha, Xan startup loyihasi, Xan startup loyihasi dasturlash",
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
