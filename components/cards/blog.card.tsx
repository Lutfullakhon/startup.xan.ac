import { getReadingTime } from '@/lib/utils'
import { IBlog } from '@/types'
import { CalendarDays, Clock, Dot, Layers2, Minus, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { Badge } from '../ui/badge'

function BlogCard(blog: IBlog) {
	return (
		<Link href={`/blogs/${blog.slug}`}>
			<div className={' my-4 group grid grid-cols-1 gap-4'}>
				<div className='relative rounded-md bg-secondary'>
					<Image
						width={650}
						height={335}
						src={blog.image.url}
						alt={blog.title}
						className='-translate-y-6 rounded-md object-cover px-2 grayscale transition-all group-hover:-translate-y-7 group-hover:grayscale-0 max-md:-translate-y-2 max-md:group-hover:-translate-y-3 md:px-7'
					/>
				</div>

				<div className='flex flex-col space-y-4'>
					{/* Time info */}
					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<CalendarDays className='size-5' />
							<p>{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</p>
						</div>
						<Minus />
						<div className='flex items-center gap-2'>
							<Clock className='size-5' />
							<p>{getReadingTime(blog.content.html)} min read</p>
						</div>
					</div>

					{/* Title */}
					<h2 className='font-space-grotesk text-3xl transition-colors group-hover:text-blue-500 max-md:text-2xl'>
						{blog.title}
					</h2>
					<p className='line-clamp-3 text-muted-foreground'>
						{blog.description}
					</p>

					{/* Author */}
					<div className='flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<Image
								src={blog.author.image.url}
								alt='author'
								width={30}
								height={30}
								className='rounded-sm object-cover'
							/>
							<p>by {blog.author.name}</p>
						</div>
						<Dot />
						<div className='flex items-center gap-2'>
							<Badge variant={'secondary'} role='button'>
								<Tag className='me-2 size-3' />
								{blog.tag.name}
							</Badge>
							<Badge variant={'outline'} role='button'>
								<Layers2 className='me-2 size-3' />
								{blog.category.name}
							</Badge>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default BlogCard
