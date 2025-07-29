'use server'

import stripe from '@/lib/stripe'

export const payment = async (price: number) => {
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: price * 100,
			currency: 'usd',
		})

		return paymentIntent.client_secret
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		throw new Error("Couldn't process payment")
	}
}
