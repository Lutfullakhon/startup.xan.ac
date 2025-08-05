'use server'

import Notification from '@/database/notification.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'

export const sendNotification = async (clerkId: string, message: string) => {
	try {
		await connectToDatabase()
		await Notification.create({ user: clerkId, message })
	} catch (error) {
		throw new Error('Error sending notification')
	}
}

export const getCount = async (clerkId: string) => {
	try {
		await connectToDatabase()
		return await Notification.countDocuments({ user: clerkId, isRead: false })
	} catch (error) {
		throw new Error('Error getting notification count')
	}
}

export const getNotifications = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const notifications = await Notification.find({ user: clerkId }).sort({
			createdAt: -1,
		})
		notifications.forEach(async n => {
			n.isRead = true
			await n.save()
		})
		return notifications
	} catch (error) {
		throw new Error('Error getting notifications')
	}
}

export const clearNotifications = async (clerkId: string, path: string) => {
	try {
		await connectToDatabase()
		await Notification.deleteMany({ user: clerkId })
		revalidatePath(path)
	} catch (error) {
		throw new Error('Error clearing notifications')
	}
}

export const deleteNotification = async (id: string, path: string) => {
	try {
		await connectToDatabase()
		await Notification.findByIdAndDelete(id)
		revalidatePath(path)
	} catch (error) {
		throw new Error('Error deleting notification')
	}
}
