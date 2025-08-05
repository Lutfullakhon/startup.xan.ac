'use client'

import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'

export default function Page() {
	const { resolvedTheme } = useTheme()
	const { lng } = useParams()

	return (
		<SignUp
			appearance={{ baseTheme: resolvedTheme === 'dark' ? dark : undefined }}
			path={`/${lng}/sign-up`}
			forceRedirectUrl={`/${lng}/`} // ✅ resolved correctly
		/>
	)
}
