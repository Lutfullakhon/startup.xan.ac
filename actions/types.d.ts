export interface ICreateCourse {
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
}

export interface ICreateUser {
	clerkId: string
	fullName: string
	email: string
	picture: string
}

export interface IUpdateUser {
	clerkId: string
	updatedData: {
		fullName: string
		email: string
		picture: string
	}
}

