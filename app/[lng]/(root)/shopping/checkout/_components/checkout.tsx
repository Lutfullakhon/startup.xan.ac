'use client'

import { purchaseCourse } from '@/actions/course.action'
import { sendNotification } from '@/actions/notification.action'
import { payment } from '@/actions/payment.action'
import { ICard } from '@/app.types'
import PaymentForm from '@/components/forms/payment.form'
import FillLoading from '@/components/shared/fill-loading'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useCart } from '@/hooks/use-cart'
import useTranslate from '@/hooks/use-translate'
import { addressSchema } from '@/lib/validation'
import { useAuth } from '@clerk/nextjs'
import {
	CardNumberElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import { AlertCircle, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { z } from 'zod'

interface Props {
	cards: ICard[]
	coupon: number
}
function Checkout({ cards, coupon }: Props) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [radioValue, setRadioValue] = useState<string>('0')

	useEffect(() => {
		if (cards.length === 0) {
			setRadioValue(`${cards.length + 1}`)
		}
	}, [cards])

	const elements = useElements()
	const stripe = useStripe()
	const { totalPrice, taxes, carts, clearCart } = useCart()
	const t = useTranslate()
	const { userId } = useAuth()
	const router = useRouter()

	const onSubmit = async (values: z.infer<typeof addressSchema>) => {
		if (!stripe || !elements) return null
		setLoading(true)

		const { address, city, fullName, zip } = values

		try {
			const { error, paymentMethod } = await stripe.createPaymentMethod({
				type: 'card',
				card: elements.getElement(CardNumberElement)!,
				billing_details: {
					name: fullName,
					address: { line1: address, city, postal_code: zip },
				},
			})

			if (error) {
				setLoading(false)
				setError(`${t('paymentError')} ${error.message}`)
			} else {
				paymentIntent(paymentMethod.id)
			}
		} catch (error) {
			setLoading(false)
			const result = error as Error
			setError(result.message)
		}
	}

	const onSavedCard = (paymentMethod: string) => {
		setLoading(true)
		try {
			paymentIntent(paymentMethod)
		} catch (error) {
			setLoading(false)
			const result = error as Error
			setError(result.message)
		}
	}

	const paymentIntent = async (paymentMethod: string) => {
		if (!stripe || !elements) return null
		setLoading(true)
		try {
			const price = totalPrice(coupon) + taxes()
			const clientSecret = await payment(price, userId!, paymentMethod)

			const { error, paymentIntent } = await stripe.confirmCardPayment(
				clientSecret!
			)

			if (error) {
				setLoading(false)
				setError(`${t('paymentError')} ${error.message}`)
			} else {
				for (const course of carts) {
					await purchaseCourse(course._id, userId!)
					await sendNotification(course.instructor.clerkId, 'messageCourseSold')
				}
				await sendNotification(userId!, 'messageCoursePurchased')
				router.push(`/shopping/success?pi=${paymentIntent.id}`)
				setTimeout(clearCart, 5000)
			}
		} catch (error) {
			setLoading(false)
			const result = error as Error
			setError(result.message)
		}
	}

	return (
		<>
			{loading && <FillLoading />}
			{error && (
				<Alert variant='destructive' className='mb-4 mt-2'>
					<AlertCircle className='size-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<RadioGroup onValueChange={setRadioValue} value={radioValue}>
				<div className='flex flex-col space-y-3'>
					{cards.map((card, i) => (
						<div
							key={card.id}
							className='flex items-center justify-between border bg-secondary p-4'
						>
							<div>
								<div className='flex items-center gap-2'>
									<RadioGroupItem value={`${i}`} id={`${i}`} />
									<Label
										htmlFor={`${i}`}
										className='font-space-grotesk font-bold capitalize'
									>
										{card.billing_details.name} |
									</Label>
									<p className='font-space-grotesk text-sm font-bold'>
										{card.card.brand} {card.card.last4}
									</p>
								</div>
								<div className='ml-6 font-space-grotesk text-sm font-bold'>
									{t('expDate')} {card.card.exp_month}/{card.card.exp_year}
								</div>
							</div>

							{radioValue === `${i}` && (
								<div className='flex justify-end'>
									<Button
										className='group max-md:w-full'
										type='button'
										onClick={() => onSavedCard(card.id)}
										disabled={loading}
									>
										<span>
											{t('payNow')}{' '}
											{(totalPrice(coupon) + taxes()).toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
											})}
										</span>
										<ArrowRight className='ml-1 size-4 transition-transform group-hover:translate-x-1' />
									</Button>
								</div>
							)}
						</div>
					))}

					<div className='flex items-center gap-2 border bg-secondary p-4'>
						<RadioGroupItem
							value={`${cards.length + 1}`}
							id={`${cards.length + 1}`}
						/>
						<Label
							htmlFor={`${cards.length + 1}`}
							className='font-space-grotesk font-bold capitalize'
						>
							{t('newCreditCard')}
						</Label>
					</div>
				</div>
			</RadioGroup>

			{radioValue === `${cards.length + 1}` && (
				<PaymentForm onHandler={onSubmit} />
			)}
		</>
	)
}

export default Checkout
