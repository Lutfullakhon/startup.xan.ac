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
	path?: string
	updatedData: Partial<IUser>
}

export interface IUpdateSection {
	lists: {_id: string; position: number}[]
	path: string
}

export interface ILessonFields {
	title: string
	content: string
	videoUrl: string
	hours: string
	minutes: string
	seconds: string
	free: boolean
}

export interface ICreateLesson {
	lesson: ILessonFields
	section: string
	path: string
}

export interface IUpdatePosition {
	lists: {_id: string; position: number}[]
	path: string
}

export interface GetCoursesParams {
	clerkId: string
	page?: number
	pageSize?: number	
}
export interface GetAllCoursesParams {
	page?: number
	pageSize?: number
	searchQuery?: string
	filter?: string
}

export interface GetReviewParams {
	clerkId: string
	page?: number
	pageSize?: number
}

export interface GetPaginationParams {
	page?: number
	pageSize?: number
}
