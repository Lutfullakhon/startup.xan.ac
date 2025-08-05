'use client'

import { clearNotifications } from '@/actions/notification.action'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import useTranslate from '@/hooks/use-translate'
import { useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

function ClearButton() {
	const [loading, setLoading] = useState(false)

	const pathname = usePathname()
	const { userId } = useAuth()
	const t = useTranslate()

	const handleClear = () => {
		setLoading(true)
		const promise = clearNotifications(userId!, pathname)

		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: t('error'),
		})
	}

	return (
		<Button
			className='relative mx-auto block font-space-grotesk font-semibold'
			size={'lg'}
			rounded={'full'}
			onClick={handleClear}
			disabled={loading}
		>
			{loading && <FillLoading />}
			{t('clearAll')}
		</Button>
	)
}

export default ClearButton
