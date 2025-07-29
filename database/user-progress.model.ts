import { Schema, models, model } from 'mongoose'

const UserProgressSchema = new Schema({
	userId: { type: String }, // ClerkId
	lessonId: { type: String },
	isCompleted: { type: Boolean, default: false },
})

const UserProgress =
	models.UserProgress || model('UserProgress', UserProgressSchema)
export default UserProgress
