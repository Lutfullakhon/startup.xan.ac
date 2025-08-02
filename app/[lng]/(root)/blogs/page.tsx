import BlogCard from '@/components/cards/blog.card'
import TopBar from '@/components/shared/top-bar'
import { getBlogs } from '@/service/blogs.service'
import { Suspense } from 'react'

async function Page() {
	const blogs = await getBlogs()

	return (
		<>
			{/* Wrap TopBar in Suspense since it likely uses useSearchParams */}
			<Suspense fallback={<div className='h-16 bg-background' />}>
				<TopBar label={'blogs'} description={'blogsDescription'} />
			</Suspense>

			<div className='container mx-auto max-w-6xl'>
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
