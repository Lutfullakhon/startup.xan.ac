'use server'

import { connectToDatabase } from '@/lib/mongoose'
import Course from '@/database/course.models'
import { ICreateCourse } from './types'
import { ICourse } from '@/app.types'
import { revalidatePath } from 'next/cache'

export const createCourse = async (data: ICreateCourse) => {
	try {
		await connectToDatabase()
		await Course.create(data)
		revalidatePath('/en/instructor/my-courses')
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		throw new Error ('Something went wrong while creating course!')
	}
}

export const getCourses = async () => {
	try {
		await connectToDatabase()
		const courses = await Course.find()
		return courses as ICourse[]
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (error) {
		throw new Error ('Something went wrong while creating course!')
	}
}