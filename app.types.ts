export interface ICourse {
	_id: string
	title: string
	description: string
	learning: string
	requirements: string
	level: string
	category: string
	language: string
	oldPrice: number
	currentPrice: number
	previewImage: string
	published: boolean
	slug: string
	tags: string
	instructor: IUser
	updatedAt: string
	totalLessons: number
	totalSections: number
	totalDuration: string
	rating: number
	reviewCount: number
	purchasedStudents: number
}

export interface ISection {
	title: string
	_id: string
	position: number
	course: string
	lessons: ILesson[]
}

export interface ILesson {
	_id: string
	title: string
	position: number
	videoUrl: string
	content: string
	free: boolean
	duration: {
		hours: number
		minutes: number
		seconds: number
	}
	userProgress: IUserProgress[]
}

export interface IUserProgress {
	userId: string
	lessonId: string
	isCompleted: string
}

export interface IUser {
	_id: string
	clerkId: string
	fullName: string
	email: string
	picture: string
	role: string
	bio: string
	phone: string
	job: string
	website: string
	linkedin: string
	github: string
	youtube: string
}


export interface IReview {
	data: string
	rating: number
	user: IUser
	createdAt: string
	_id: string
	course: ICourse
	isFlag: boolean
}

export interface ICard {
	id: string
	billing_details: {
		address: {
			city: string
			country: string
			line1: string
			line2: string
			postal_code: string
			state: string
		}
		name: string
	}
	card: {
		brand: string
		exp_month: number
		exp_year: number
		last4: string
	}
}

export interface IPayment {
	id: string
	metadata: { orderId: string }
	created: number
	amount: number
	status: string
	payment_method: {
		card: {
			brand: string
			last4: string
		}
	}
}

