import { Schema, models, model } from 'mongoose'

const ReviewSchema = new Schema(
	{
		data: String,
		rating: Number,
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		course: { type: Schema.Types.ObjectId, ref: 'Course' },
		isFlag: { type: Boolean, default: false },
	},
	{ timestamps: true }
)

const Review = models.Review || model('Review', ReviewSchema)
export default Review
