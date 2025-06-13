import { Schema, model, models } from 'mongoose'


const LessonSchema = new Schema({
	title: String,
	position: Number,
	content: String,
	videoUrl: String,
	duration: {
		hours: { type: Number, default: 0 },
		minutes: { type: Number, default: 0 },
		seconds: { type: Number, default: 0 },
	},
	section: { type: Schema.Types.ObjectId, ref: 'Section' },
	free: {type: Boolean, default: false},
})

const Lesson = models.Lesson || model('Lesson', LessonSchema)
export default Lesson
