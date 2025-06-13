/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { connectToDatabase } from '@/lib/mongoose'
import Course from '@/database/course.models'
import { GetAllCoursesParams, GetCoursesParams, ICreateCourse } from './types'
import { ICourse, ILesson } from '@/app.types'
import { revalidatePath } from 'next/cache'
import User from '@/database/user.model'
import { cache } from 'react'
import { calculateTotalDuration } from '@/lib/utils'
import Section from '@/database/section.model'
import Lesson from '@/database/lesson.model'
import { FilterQuery } from 'mongoose'

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

export const getCourses = async (params: GetCoursesParams) => {
	try {
		await connectToDatabase()
		const { clerkId, page = 1, pageSize = 3 } = params

		const skipAmount = (page - 1) * pageSize

		const user = await User.findOne({ clerkId })
		const { _id } = user
		const courses = await Course.find({ instructor: _id })
			.skip(skipAmount)
			.limit(pageSize)

		const totalCourses = await Course.find({ instructor: _id }).countDocuments()
		const isNext = totalCourses > skipAmount + courses.length

		return { courses, isNext, totalCourses }
	} catch (error) {
		throw new Error('Soething went wrong while getting course!')
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

export const getFeaturedCourses = cache(async () => {
	try {
		await connectToDatabase()
		const courses = await Course.find({ published: true })
			.limit(6)
			.sort({ createdAt: -1 })
			.select('previewImage title slug oldPrice currentPrice instructor')
			.populate({
				path: 'instructor',
				select: 'fullName picture',
				model: User,
			})

		return courses
	} catch (error) {
		throw new Error('Something went wrong while getting featured courses!')
	}
})

export const getDetailedCourse = cache(async (id: string) => {
	try {
		await connectToDatabase()

		const course = await Course.findById(id)
			.select(
				'title description instructor previewImage oldPrice currentPrice learning requirements tags updatedAt level category language'
			)
			.populate({
				path: 'instructor',
				select: 'fullName picture',
				model: User,
			})

		const sections = await Section.find({ course: id }).populate({
			path: 'lessons',
			model: Lesson,
		})

		const totalLessons: ILesson[] = sections
			.map(section => section.lessons)
			.flat()

		const data = {
			...course._doc,
			totalLessons: totalLessons.length,
			totalSections: sections.length,
			totalDuration: calculateTotalDuration(totalLessons),
		}

		return data
	} catch (error) {
		throw new Error('Something went wrong while getting detailed course!')
	}
})

export const getAllCourses = async (params: GetAllCoursesParams) => {
	try {
		await connectToDatabase()
		const { searchQuery, filter, page = 1, pageSize = 6 } = params

		const skipAmount = (page - 1) * pageSize

		const query: FilterQuery<typeof Course> = {}

		if (searchQuery) {
			query.$or = [{ title: { $regex: new RegExp(searchQuery, 'i') } }]
		}

		let sortOptions = {}

		switch (filter) {
			case 'newest':
				sortOptions = { createdAt: -1 }
				break
			case 'popular':
				sortOptions = { students: -1 }
				break
			case 'lowest-price':
				sortOptions = { currentPrice: 1 }
				break
			case 'highest-price':
				sortOptions = { currentPrice: -1 }
				break
			case 'english':
				query.language = 'english'
				break
			case 'uzbek':
				query.language = 'uzbek'
				break
			case 'russian':
				query.language = 'russian'
				break
			case 'turkish':
				query.language = 'turkish'
				break
			case 'beginner':
				query.level = 'beginner'
				break
			case 'intermediate':
				query.level = 'intermediate'
				break
			case 'advanced':
				query.level = 'advanced'
				break
			default:
				break
		}

		const courses = await Course.find(query)
			.select('previewImage title slug _id oldPrice currentPrice instructor')
			.populate({
				path: 'instructor',
				select: 'fullName picture',
				model: User,
			})
			.skip(skipAmount)
			.limit(pageSize)
			.sort(sortOptions)

		const totalCourses =await Course.countDocuments(query)
		
		const isNext = totalCourses > skipAmount + courses.length

		return { courses, isNext, totalCourses }
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}