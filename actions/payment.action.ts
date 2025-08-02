'use server'

import { connectToDatabase } from '@/lib/mongoose'
import stripe from '@/lib/stripe'
import { atachPayment, getCustomer } from './customer.action'
import { generateNumericId } from '@/lib/utils'

export const payment = async (
	price: number,
	clerkId: string,
	paymentMethod: string
) => {
	try {
		// ✅ Ensure amount is >= Stripe minimum (USD = $0.50)
		if (price < 0.5) {
			throw new Error('Amount must be at least $0.50')
		}

		await connectToDatabase()
		const customer = await getCustomer(clerkId)
		await atachPayment(paymentMethod, customer.id)

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(price * 100), // Stripe expects amount in cents
			currency: 'usd',
			customer: customer.id,
			payment_method: paymentMethod,
			metadata: { orderId: generateNumericId() },
			automatic_payment_methods: { enabled: true },
		})

		return paymentIntent.client_secret
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		const result = error as Error
		throw new Error(result.message)

	}
}

export const retrievePayment = async (pi: string) => {
	try {
		return await stripe.paymentIntents.retrieve(pi, {
			expand: ['payment_method'],
		})
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}

export const applyCoupon = async (code: string) => {
	try {
		const coupon = await stripe.coupons.retrieve(code)

		return JSON.parse(JSON.stringify(coupon))
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}

