import React from 'react'
import Hero from './_components/hero'
import FeaturedCourses from './_components/featured-courses'
import Categories from './_components/categories'
import Instructor from './_components/instructor'
import LearningJourney from './_components/learning-journey'

async function Page() {
	return (
		<>
			<Hero />
			<FeaturedCourses />
			<Categories />
			<Instructor />
			<LearningJourney />
		</>
	)
}

export default Page
