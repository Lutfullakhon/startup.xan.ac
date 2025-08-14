'use client'

import Link from 'next/link'
import { Button } from '../ui/button'
import { Bot } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function AiButton() {
	const { theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		// Render a neutral version to avoid SSR/CSR mismatch
		return null
	}

	const bgClass =
		theme === 'dark'
			? 'bg-white text-black hover:bg-gray-300'
			: 'bg-black text-white hover:bg-gray-500'

	return (
		<Button
			className={`fixed bottom-5 right-5 size-12 rounded-full ${bgClass}`}
			size='icon'
			asChild
		>
			<Link aria-label='AI assistant' href='/ai'>
				<Bot />
			</Link>
		</Button>
	)
}

export default AiButton
