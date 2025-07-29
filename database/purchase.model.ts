import { Schema, model, models } from 'mongoose'

const PurchaseSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		course: { type: Schema.Types.ObjectId, ref: 'Course' },
	},
	{ timestamps: true }
)

const Purchase = models.Purchase || model('Purchase', PurchaseSchema)
export default Purchase
