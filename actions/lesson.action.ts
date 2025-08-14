 
 'use server'

import { connectToDatabase } from '@/lib/mongoose'
import { ICreateLesson, ILessonFields, IUpdatePosition } from './types'
import Section from '@/database/section.model'
import Lesson from '@/database/lesson.model'
import { revalidatePath } from 'next/cache'
import UserProgress from '@/database/user-progress.model'
import { ILesson } from '@/app.types'


export const getLessons = async (section: string) => {
	try {
		await connectToDatabase()
		return await Lesson.find({ section }).sort({ position: 1 })
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const createLesson = async (params: ICreateLesson) => {
  try {
    await connectToDatabase()

    const { lesson, section, path } = params
    const duration = {
      hours: Number(lesson.hours),
      minutes: Number(lesson.minutes),
      seconds: Number(lesson.seconds),
    }

    const existSection = await Section.findById(section)
    if (!existSection) {
      throw new Error('Section not found')
    }
    
    if (!Array.isArray(existSection.lessons)) {
      throw new Error('Section lessons field is invalid')
    }
    const position = existSection.lessons.length

    const newLesson = await Lesson.create({
      ...lesson,
      position,
      duration,
      section,
    })
    
    existSection.lessons.push(newLesson._id)
    await existSection.save()
   
    revalidatePath(path)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong!')
  }
}

export const deleteLesson = async (id: string, path: string) => {
	try {
		await connectToDatabase()
		const lesson = await Lesson.findById(id)
		const section = await Section.findById(lesson.section)
		section.lessons.pull(id)
		section.save()
		await Lesson.findByIdAndDelete(id)
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}    

export const editLesson = async (
	lesson: ILessonFields,
	lessonId: string,
	path: string
) => {
	try {
		await connectToDatabase()
		const duration = {
			hours: Number(lesson.hours),
			minutes: Number(lesson.minutes),
			seconds: Number(lesson.seconds),
		}

		await Lesson.findByIdAndUpdate(lessonId, { ...lesson, duration })
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const editLessonPosition = async (params: IUpdatePosition) => {
	try {
		await connectToDatabase()
		const { lists, path } = params
		for (const item of lists) {
			await Lesson.findByIdAndUpdate(item._id, { position: item.position })
		}

		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}


export const completeLesson = async (
	lessonId: string,
	userId: string,
	path: string
) => {
	try {
		await connectToDatabase()
		const userProgress = await UserProgress.findOne({ userId, lessonId })
		if (userProgress) {
			userProgress.isCompleted = true
			await userProgress.save()
		} else {
			const newUserProgress = new UserProgress({
				userId,
				lessonId,
				isCompleted: true,
			})
			const lesson = await Lesson.findById(lessonId)
			lesson.userProgress.push(newUserProgress._id)
			await lesson.save()
			await newUserProgress.save()
		}

		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const uncompleteLesson = async (lessonId: string, path: string) => {
	try {
		await connectToDatabase()
		await UserProgress.findOneAndDelete({ lessonId })

		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const getLesson = async (id: string) => {
	try {
		await connectToDatabase()
		return await Lesson.findById(id).select('title content videoUrl')
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const getNextLesson = async (lessonId: string, courseId: string) => {
	try {
		await connectToDatabase()
		const sections = await Section.find({ course: courseId }).populate({
			path: 'lessons',
			options: { sort: { position: 1 } },
			model: Lesson,
		})

		const lessons: ILesson[] = sections.map(section => section.lessons).flat()

		const lessonIndex = lessons.findIndex(
			item => item._id.toString() === lessonId
		)

		if (lessonIndex === lessons.length - 1) {
			return null
		}

		const nextLesson = lessons[lessonIndex + 1]

		const section = await Section.findOne({ lessons: nextLesson._id })

		return { lessonId: nextLesson._id.toString(), sectionId: section._id.toString() }
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

export const getLastLesson = async (clerkId: string, courseId: string) => {
  try {
    await connectToDatabase();

    const sections = await Section.find({ course: courseId })
      .select('lessons')
      .sort({ position: 1 })
      .populate({
        path: 'lessons',
        model: Lesson,
        select: 'userProgress',
        options: { sort: { position: 1 } },
      });

    if (!sections.length || !sections[0].lessons.length) {
      // Fallback: return a fake/default lesson and section ID
      // You can also return empty strings if that's preferred
      return {
        sectionId: '000000000000000000000000',
        lessonId: '000000000000000000000000',
      };
    }

    const lessons: ILesson[] = sections.map((section) => section.lessons).flat();

    const userProgress = await UserProgress.find({
      userId: clerkId,
      lessonId: { $in: lessons.map((lesson) => lesson._id) },
      isCompleted: true,
    }).sort({ createdAt: -1 });

    const lastLesson = userProgress[userProgress.length - 1];

    if (!lastLesson) {
      // Fallback to first lesson
      return {
        sectionId: sections[0]._id.toString(),
        lessonId: sections[0].lessons[0]._id.toString(),
      };
    }

    const section = await Section.findOne({ lessons: lastLesson.lessonId });

    return {
      lessonId: lastLesson.lessonId.toString(),
      sectionId: section?._id.toString() || sections[0]._id.toString(),
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong!'
    );
  }
};

export const getFreeLessons = async (courseId: string) => {
	try {
		await connectToDatabase()
		const sections = await Section.find({ course: courseId }).populate({
			path: 'lessons',
			model: Lesson,
			select: 'title videoUrl duration',
			match: { free: true },
		})

		const lessons = sections.map(section => section.lessons).flat()

		return JSON.parse(JSON.stringify(lessons))
	} catch (error) {
		throw new Error('Something went wrong!')
	}
}

