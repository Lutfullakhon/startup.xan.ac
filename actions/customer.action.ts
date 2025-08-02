'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import stripe from '@/lib/stripe'
import { revalidatePath } from 'next/cache'

export const createCustomer = async (userId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findById(userId).select('email fullName')
		console.log('[CREATE CUSTOMER] Found user:', user)

		if (!user) throw new Error(`User with _id ${userId} not found`)

		const { email, fullName } = user

		const customer = await stripe.customers.create({
			email,
			name: fullName,
			metadata: { userId: String(userId) },

		})

		await User.findByIdAndUpdate(userId, { customerId: customer.id })

		console.log('[CREATE CUSTOMER] Created customer:', customer.id)

		return customer
	} catch (error) {
		console.error('[CREATE CUSTOMER ERROR]', error)
		throw new Error("Couldn't create customer")
	}
}


export const getCustomer = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId }).select('customerId')
		const { _id, customerId } = user

		if (!customerId) return await createCustomer(_id)

		return await stripe.customers.retrieve(customerId)
	} catch (error) {
		throw new Error("Couldn't get customer details")
	}
}


export const atachPayment = async (
  paymentMethod: string,
  customer: string,
  path?: string
) => {
  try {
    if (path) {
      revalidatePath(path)
    }

    return await stripe.paymentMethods.attach(paymentMethod, { customer })
  } catch (error) {
    const result = error as Error
		throw new Error(result.message)
  }
}


export const detachPaymentMethod = async (
	paymentMethod: string,
	path: string
) => {
	try {
		await stripe.paymentMethods.detach(paymentMethod)
		revalidatePath(path)
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}

export const getCustomerCards = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const customer = await getCustomer(clerkId)

		const paymentMethods = await stripe.paymentMethods.list({
			customer: customer.id,
			type: 'card',
			limit: 10,
		})

		return paymentMethods.data
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}

export const getPaymentIntents = async (clerkId: string) => {
	try {
		const customer = await getCustomer(clerkId)

		const payments = await stripe.paymentIntents.list({
			customer: customer.id,
			limit: 100,
			expand: ['data.payment_method'],
		})

		return payments.data
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}

