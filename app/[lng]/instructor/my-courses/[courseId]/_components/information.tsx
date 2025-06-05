'use client'

import { updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { informationSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function Information(course: ICourse) {
	const { state, onToggle } = useToggleEdit()

	return (
		<Card>
			<CardContent className='relative p-6'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Information</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <Edit2 />}
					</Button>
				</div>
				<Separator className='my-3' />

				{state ? (
					<Forms course={course} onToggle={onToggle} />
				) : (
					<div className='flex flex-col space-y-2'>
						<div className='grid grid-cols-3 gap-2'>
							<div className='col-span-1 font-space-grotesk font-bold text-muted-foreground'>
								Requirements:
							</div>
							<div className='col-span-2 line-clamp-3'>
								{course.requirements}
							</div>
						</div>
						<div className='grid grid-cols-3 gap-2'>
							<div className='col-span-1 font-space-grotesk font-bold text-muted-foreground'>
								Learning:
							</div>
							<div className='col-span-2 line-clamp-3'>{course.learning}</div>
						</div>
						<div className='grid grid-cols-3 gap-2'>
							<div className='col-span-1 font-space-grotesk font-bold text-muted-foreground'>
								Tags:
							</div>
							<div className='col-span-2 line-clamp-3'>{course.tags}</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default Information

interface FormsProps {
	course: ICourse
	onToggle: () => void
}
function Forms({ course, onToggle }: FormsProps) {
	const [isLoading, setIsLoading] = useState(false)

	const pathname = usePathname()

	const form = useForm<z.infer<typeof informationSchema>>({
		resolver: zodResolver(informationSchema),
		defaultValues: {
			requirements: course.requirements,
			learning: course.learning,
			tags: course.tags,
		},
	})

	const onSubmit = (values: z.infer<typeof informationSchema>) => {
		setIsLoading(true)
		const promise = updateCourse(course._id, values, pathname)
			.then(() => onToggle())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully updated!',
			error: 'Something went wrong!',
		})
	}

	return (
		<>
			{isLoading && <FillLoading />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
					<FormField
						control={form.control}
						name='requirements'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='learning'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='tags'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea disabled={isLoading} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' disabled={isLoading}>
						Save
					</Button>
				</form>
			</Form>
		</>
	)
}
