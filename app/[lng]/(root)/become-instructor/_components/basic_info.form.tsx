import useTranslate from '@/hooks/use-translate'
import React from 'react'

function BasicInfoForm() {
	const t = useTranslate()

	return (
		<>
			<h2 className='font-space-grotesk text-xl font-bold'>
				{t('basicInformation')}
			</h2>
			<p className='text-xs text-muted-foreground'>
				{t('basicInformationDescription')}
			</p>
		</>
	)
}

export default BasicInfoForm
