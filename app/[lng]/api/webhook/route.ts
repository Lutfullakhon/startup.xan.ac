import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'
import { createUser, updateUser } from '@/actions/user.action'
import type { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req) as WebhookEvent

		const eventType = evt.type

		if (eventType === 'user.created') {
			const { id, email_addresses, image_url, first_name, last_name } = evt.data

			const user = await createUser({
				clerkId: id,
				email: email_addresses[0]?.email_address || '',
				fullName: `${first_name || ''} ${last_name || ''}`.trim() || email_addresses[0]?.email_address || 'Unnamed User',
				picture: image_url,
			})

			return NextResponse.json({ message: 'User created', user })
		}

		if (eventType === 'user.updated') {
			const { id, email_addresses, image_url, first_name, last_name } = evt.data

			const user = await updateUser({
				clerkId: id,
				updatedData: {
					email: email_addresses[0]?.email_address || '',
					fullName: `${first_name || ''} ${last_name || ''}`.trim(),
					picture: image_url,
				},
				path: ''
			})

			return NextResponse.json({ message: 'User updated', user })
		}

		return NextResponse.json({ message: `Unhandled event type: ${eventType}` })
	} catch (err) {
		console.error('Error verifying webhook:', err)
		return new Response('Error verifying webhook', { status: 400 })
	}
}
