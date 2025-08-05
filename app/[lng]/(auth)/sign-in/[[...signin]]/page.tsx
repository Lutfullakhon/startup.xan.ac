'use client'

import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'

export default function Page() {
	const { resolvedTheme } = useTheme()
	const { lng } = useParams() as { lng: string } // get current language

	return (
		<SignIn
			appearance={{ baseTheme: resolvedTheme === 'dark' ? dark : undefined }}
			path={`/${lng}/sign-in`}
			fallbackRedirectUrl={`/${lng}/`}
			forceRedirectUrl={`/${lng}/dashboard`}
		/>
	)
}
