import { Schema, model, models } from 'mongoose'

const NotificationSchema = new Schema(
	{
		user: String, // clerkId
		message: { type: String },
		isRead: { type: Boolean, default: false },
	},
	{ timestamps: true }
)

const Notification =
	models.Notification || model('Notification', NotificationSchema)
export default Notification
