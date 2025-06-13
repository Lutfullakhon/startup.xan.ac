import React from 'react'
import Hero from './_components/hero'
import FeaturedCourses from './_components/featured-courses'
import Categories from './_components/categories'
import Instructor from './_components/instructor'
import LearningJourney from './_components/learning-journey'
import { getFeaturedCourses } from '@/actions/course.action'

async function Page() {
	const coursesJSON = await getFeaturedCourses()
	const courses = JSON.parse(JSON.stringify(coursesJSON))

	console.log(courses)

	return (
		<>
			<Hero />
			<FeaturedCourses courses={courses} />
			<Categories />
			<Instructor />
			<LearningJourney />
		</>
	)
}

export default Page
