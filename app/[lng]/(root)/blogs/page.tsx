import BlogCard from '@/components/cards/blog.card'
import TopBar from '@/components/shared/top-bar'
import { getBlogs } from '@/service/blogs.service'
import React from 'react'

async function Page() {
	const blogs = await getBlogs()

	return (
		<>
			<TopBar label={'blogs'} description={'blogsDescription'} />
			<div className='container mx-auto max-w-6xl '>
				<div className='mt-24 grid grid-cols-2 gap-4 max-md:grid-cols-1'>
					{blogs.map(blog => (
						<BlogCard key={blog.slug} {...blog} />
					))}
				</div>
			</div>
		</>
	)
}

export default Page
