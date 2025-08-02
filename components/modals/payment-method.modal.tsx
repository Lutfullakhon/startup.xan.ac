import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { usePaymentMethod } from '@/hooks/use-payment-method'
import { loadStripe } from '@stripe/stripe-js'
import {
	CardNumberElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import FillLoading from '../shared/fill-loading'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import PaymentForm from '../forms/payment.form'
import { addressSchema } from '@/lib/validation'
import { z } from 'zod'
import useTranslate from '@/hooks/use-translate'
import { atachPayment, getCustomer } from '@/actions/customer.action'
import { useAuth } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)
function PaymentMethodModal() {
	const { isOpen, onClose } = usePaymentMethod()

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-2xl'>
				<DialogTitle>Add Payment Method</DialogTitle>
				<Elements stripe={stripePromise}>
					<StripeElement />
				</Elements>
			</DialogContent>
		</Dialog>
	)
}

export default PaymentMethodModal

function StripeElement() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const elements = useElements()
	const stripe = useStripe()
	const t = useTranslate()
	const { userId } = useAuth()
	const pathname = usePathname()
	const { onClose } = usePaymentMethod()

	const onSubmit = async (values: z.infer<typeof addressSchema>) => {
		if (!stripe || !elements) return null
		setLoading(true)

		const { address, city, fullName, zip } = values

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardNumberElement)!,
			billing_details: {
				name: fullName,
				address: { line1: address, city, postal_code: zip },
			},
		})

		if (error) {
			setError(`${t('paymentError')} ${error.message}`)
			setLoading(false)
		} else {
			const customer = await getCustomer(userId!)
			await atachPayment(paymentMethod.id, customer.id, pathname)
			onClose()
			setError('')
			setLoading(false)
		}
	}

	return (
		<>
			{loading && <FillLoading />}
			{error && (
				<Alert variant='destructive' className='mb-4'>
					<AlertCircle className='size-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<PaymentForm isProfile onHandler={onSubmit} />
		</>
	)
}
