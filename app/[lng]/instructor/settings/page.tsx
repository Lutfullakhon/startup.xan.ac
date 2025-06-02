'use client'

import React from 'react'
import Header from '../_components/header'
import { SignedIn, SignedOut, UserProfile } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'

function Page() {
	const { resolvedTheme } = useTheme()

	const appearance = {
		baseTheme: resolvedTheme === 'dark' ? dark : undefined,
		variables: {
			colorBackground: resolvedTheme === 'dark' ? '#020817' : '#fff',
		},
	}

	return (
		<>
			<Header title='Settings' description='Manage your account settings' />

			<div className='mt-6'>
				<SignedIn>
					<UserProfile routing='hash' appearance={appearance} />
				</SignedIn>

				<SignedOut>
					<p className='text-center text-red-500'>
						You must be signed in to view your profile settings.
					</p>
				</SignedOut>
			</div>
		</>
	)
}

export default Page
