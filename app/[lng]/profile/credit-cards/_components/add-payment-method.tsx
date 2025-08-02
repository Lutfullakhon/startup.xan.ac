'use client'

import PaymentMethodModal from '@/components/modals/payment-method.modal'
import { Button } from '@/components/ui/button'
import { usePaymentMethod } from '@/hooks/use-payment-method'
import useTranslate from '@/hooks/use-translate'
import { FaRegCreditCard } from 'react-icons/fa'

function AddPaymentMethod() {
	const t = useTranslate()
	const { onOpen } = usePaymentMethod()

	return (
		<>
			<Button
				className='mx-auto w-fit'
				size={'lg'}
				rounded={'full'}
				onClick={onOpen}
			>
				<span>{t('addPaymentMethod')}</span>
				<FaRegCreditCard className='ml-2' />
			</Button>

			<PaymentMethodModal />
		</>
	)
}

export default AddPaymentMethod
