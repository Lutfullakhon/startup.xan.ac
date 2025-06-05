/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { connectToDatabase } from '@/lib/mongoose'
import Course from '@/database/course.models'
import { ICreateCourse } from './types'
import { ICourse } from '@/app.types'
import { revalidatePath } from 'next/cache'
import User from '@/database/user.model'

export const createCourse = async (data: ICreateCourse, clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({clerkId})
		await Course.create({...data, instructor: user._id})
		revalidatePath('/en/instructor/my-courses')
	 
	} catch (error) {
		throw new Error ('Something went wrong while creating course!')
	}
}

export const getCourses = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({clerkId})
		const courses = await Course.find({instructor: user._id})
		return courses as ICourse[]
	 
	} catch (error) {
		throw new Error ('Something went wrong while creating course!')
	}
}

export const getCourseById = async (id: string) => {
	try {
		console.log('Connecting to DB...')
		await connectToDatabase()

		console.log('Fetching course with ID:', id)
		const course = await Course.findById(id)

		if (!course) {
			console.warn('Course not found with ID:', id)
			return null
		}

		console.log('Course found:', course)
		return course as ICourse
	} catch (error) {
		console.error('Error in getCourseById:', error)
		throw new Error('Something went wrong while getting course!')
	}
}


export const updateCourse = async(id: string, updateData: Partial<ICourse>,
	path: string
) => {
	try {
		await connectToDatabase()
		await Course.findByIdAndUpdate(id, updateData) 
		revalidatePath(path)
	} catch (error) {
		throw new Error('something went wrong while updating status!')
		
	}
}

export const deleteCourse = async(id: string,
	path: string
) => {
	try {
		await connectToDatabase()
		await Course.findByIdAndDelete(id) 
		revalidatePath(path)
	} catch (error) {
		throw new Error('something went wrong while deleting course!')
		
	}
}