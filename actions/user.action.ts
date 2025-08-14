/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { connectToDatabase } from '@/lib/mongoose'
import { GetPaginationParams, ICreateUser, IUpdateUser } from './types'
import User from '@/database/user.model'
import Review from '@/database/review.model'
import Course from '@/database/course.models'
import Notification from '@/database/notification.model'
import mongoose, { Types } from 'mongoose'
import { cache } from 'react'
import { revalidatePath } from 'next/cache'
import { IUser } from '@/app.types'
import { clerkClient } from '@clerk/nextjs/server'

export const createUser = async (data: ICreateUser) => {
	try {
		await connectToDatabase()
		const { clerkId, email, fullName, picture } = data
		const isExist = await User.findOne({ clerkId })

		if (isExist) {
			const updatedUser = await User.findOneAndUpdate(
				{ email },
				{ fullName, picture, clerkId },
				{ new: true }
			)

			return updatedUser
		}

		const newUser = await User.create(data)

		return newUser
	} catch (error) {
		throw new Error('Error creating user. Please try again.')
	}
}

export const updateUser = async (data: IUpdateUser) => {
	try {
		await connectToDatabase()
		const { clerkId, updatedData, path } = data

		const updatedUser = await User.findOneAndUpdate({ clerkId }, updatedData, {
			new: true,
		})

		const plainUser = updatedUser?.toObject()

		if (path) {
			revalidatePath(path)
		}

		return plainUser
	} catch (error) {
		console.error('Update user error:', error)
		throw new Error('Error updating user. Please try again.')
	}
}

export const getUserById = cache(async (clerkId: string): Promise<IUser | null> => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId }).lean()
		return user as IUser | null
	} catch (error) {
		throw new Error('Error fetching user. Please try again.')
	}
})

export const getUser = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId }).select(
			'fullName picture clerkId email role isAdmin'
		)
		if (!user) return 'notFound'
		return JSON.parse(JSON.stringify(user))
	} catch (error) {
		throw new Error('Error fetching user. Please try again.')
	}
}

export const getUserReviews = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId }).select('_id')

		const reviews = await Review.find({ user: user._id })
			.sort({ createdAt: -1 })
			.populate({ path: 'user', model: User, select: 'fullName picture' })
			.populate({ path: 'course', model: Course, select: 'title' })

		return reviews
	} catch (error) {
		throw new Error('Error getting user reviews')
	}
}

export const getAdminInstructors = async (params: GetPaginationParams) => {
	try {
		await connectToDatabase()
		const { page = 1, pageSize = 3 } = params

		const skipAmount = (page - 1) * pageSize

		const instructors = await User.find({ role: 'instructor' })
			.skip(skipAmount)
			.limit(pageSize)
			.sort({ createdAt: -1 })

		const totalInstructors = await User.countDocuments({ role: 'instructor' })
		const isNext = totalInstructors > skipAmount + instructors.length

		return { instructors, isNext, totalInstructors }
	} catch (error) {
		throw new Error('Error getting instructors')
	}
}

export const getInstructors = async () => {
	try {
		await connectToDatabase()
		return await User.find({ approvedInstructor: true })
			.select('isAdmin role email website youtube github job clerkId')
			.lean()
	} catch (error) {
		throw new Error('Error getting instructors')
	}
}

export const getRole = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId }).select('role isAdmin')
		return user
	} catch (error) {
		throw new Error('Error getting role')
	}
}

/**
 * Delete an instructor and all their related data
 */
// Initialize Clerk SDK


export async function deleteUser(id: string, isClerkId = false, path?: string) {
  await connectToDatabase();

  // Normalize clerkClient shape across versions (object vs function returning a client)
  const getClerk = async () => {
    const maybe: any = clerkClient as any;
    return typeof maybe === 'function' ? await maybe() : maybe;
  };

  // 1) Locate the user first
  const user =
    isClerkId ? await User.findOne({ clerkId: id }) : await User.findById(id);

  if (!user) {
    throw new Error('User not found');
  }

  // 2) Start a DB transaction for consistent cleanup
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Collect course ids if this user is an instructor
    let courseIds: Types.ObjectId[] = [];

    if (user.role === 'instructor') {
      const courses = await Course.find({ instructor: user._id })
        .select('_id')
        .session(session);

      courseIds = courses.map((c: { _id: Types.ObjectId }) => c._id);
    }

    // 3) Delete reviews they wrote
    await Review.deleteMany({ user: user._id }).session(session);

    // 4) If instructor, delete their courses and reviews about those courses
    if (user.role === 'instructor') {
      if (courseIds.length) {
        await Review.deleteMany({ course: { $in: courseIds } }).session(session);
      }
      await Course.deleteMany({ instructor: user._id }).session(session);
    }

    // 5) Delete notifications that may reference the user by different fields
    await Notification.deleteMany({
      $or: [
        { user: user._id },
        { userId: user._id },
        { recipient: user._id },
        { recipientId: user._id },
        { recipientClerkId: user.clerkId },
        { clerkId: user.clerkId },
      ],
    }).session(session);

    // 6) Finally delete the user document
    await User.deleteOne({ _id: user._id }).session(session);

    // 7) Commit DB changes first
    await session.commitTransaction();
    session.endSession();

    // 8) Try deleting from Clerk (non-transactional external side-effect)
    if (user.clerkId) {
      try {
        const cc = await getClerk();
        await cc.users.deleteUser(user.clerkId);
      } catch (err) {
        console.error(`Failed to delete user ${user.clerkId} from Clerk:`, err);
        // DB is already consistent; we log and continue
      }
    }

    if (path) revalidatePath(path);
    return { success: true };
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error deleting user:', err);
    throw new Error(err?.message || 'Failed to delete user');
  }
}







