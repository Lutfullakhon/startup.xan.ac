'use client'

import {
	createLesson,
	editLesson,
	editLessonPosition,
} from '@/actions/lesson.action'
import { ILessonFields } from '@/actions/types'
import { ILesson, ISection } from '@/app.types'
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
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import useToggleEdit from '@/hooks/use-toggle-edit'
import { lessonSchema } from '@/lib/validation'
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd'
import { zodResolver } from '@hookform/resolvers/zod'
import { BadgePlus, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import LessonList from './lesson-list'
import { Editor } from '@tinymce/tinymce-react'
import { editorConfig } from '@/constants'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
	section: ISection
	lessons: ILesson[]
}

function Lessons({ section, lessons }: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [currentLesson, setCurrentLesson] = useState<ILessonFields | null>(null)
	const [lessonId, setLessonId] = useState('')

	const path = usePathname()
	const { onToggle, state } = useToggleEdit()

	const onAdd = async (lesson: ILessonFields) => {
		setIsLoading(true)
		return createLesson({ lesson, section: section._id, path })
			.then(() => onToggle())
			.finally(() => setIsLoading(false))
	}

	const onStartEdit = (lesson: ILesson) => {
		setIsEdit(true)
		setLessonId(lesson._id)
		setCurrentLesson({
			content: lesson.content,
			hours: `${lesson.duration.hours}`,
			minutes: `${lesson.duration.minutes}`,
			seconds: `${lesson.duration.seconds}`,
			title: lesson.title,
			videoUrl: lesson.videoUrl,
			free: lesson.free,
		})
	}

	const onFinishEdit = () => {
		setIsEdit(false)
		setCurrentLesson(null)
		setLessonId('')
	}

	const onEdit = async (lesson: ILessonFields) => {
		setIsLoading(true)
		return editLesson(lesson, lessonId, path)
			.then(() => onFinishEdit())
			.finally(() => setIsLoading(false))
	}

	const onReorder = (updateData: { _id: string; position: number }[]) => {
		setIsLoading(true)
		const promise = editLessonPosition({ lists: updateData, path }).finally(
			() => setIsLoading(false)
		)

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully reordered!',
			error: 'Something went wrong!',
		})
	}

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return null

		const items = Array.from(lessons)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		const startIndex = Math.min(result.source.index, result.destination.index)
		const endIndex = Math.max(result.source.index, result.destination.index)

		const updatedLessons = items.slice(startIndex, endIndex + 1)

		const bulkUpdatedData = updatedLessons.map(lesson => ({
			_id: lesson._id,
			position: items.findIndex(item => item._id === lesson._id),
		}))

		onReorder(bulkUpdatedData)
	}

	return (
		<Card>
			<CardContent className='relative p-6'>
				{isLoading && <FillLoading />}
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Manage chapters</span>
					{!isEdit && (
						<Button size='icon' variant='ghost' onClick={onToggle}>
							{state ? <X /> : <BadgePlus />}
						</Button>
					)}
				</div>
				<Separator className='my-3' />

				{state ? (
					<Forms lesson={{} as ILessonFields} handler={onAdd} />
				) : isEdit ? (
					<Forms
						lesson={currentLesson as ILessonFields}
						handler={onEdit}
						isEdit
						onCancel={onFinishEdit}
					/>
				) : (
					<>
						{!lessons.length ? (
							<p className='text-muted-foreground'>No lessons</p>
						) : (
							<DragDropContext onDragEnd={onDragEnd}>
								<Droppable droppableId='lessons'>
									{provided => (
										<div {...provided.droppableProps} ref={provided.innerRef}>
											{lessons.map((lesson, index) => (
												<LessonList
													key={lesson._id}
													lesson={lesson}
													index={index}
													onStartEdit={() => onStartEdit(lesson)}
												/>
											))}
										</div>
									)}
								</Droppable>
							</DragDropContext>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}

export default Lessons

interface FormProps {
	lesson: ILessonFields
	handler: (lesson: ILessonFields) => Promise<void>
	isEdit?: boolean
	onCancel?: () => void
}

function Forms({ handler, lesson, isEdit = false, onCancel }: FormProps) {
	const { content, hours, minutes, seconds, title, videoUrl, free } = lesson

	const form = useForm<z.infer<typeof lessonSchema>>({
		resolver: zodResolver(lessonSchema),
		defaultValues: {
			title: title || '',
			videoUrl: videoUrl || '',
			hours: `${hours}`,
			minutes: `${minutes}`,
			seconds: `${seconds}`,
			content: content || '',
			free,
		},
	})

	const onSubmit = (values: z.infer<typeof lessonSchema>) => {
		const promise = handler(values as ILessonFields).finally(() => form.reset())

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully added!',
			error: 'Something went wrong!',
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Title'
									className='bg-secondary'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='videoUrl'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder='Video URL'
									className='bg-secondary'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Editor
									apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
									init={editorConfig}
									onBlur={field.onBlur}
									initialValue={content}
									onEditorChange={content => field.onChange(content)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='grid grid-cols-3 gap-2'>
					<FormField
						control={form.control}
						name='hours'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type='number'
										placeholder='Hours'
										className='bg-secondary'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='minutes'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type='number'
										placeholder='Minutes'
										className='bg-secondary'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='seconds'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type='number'
										placeholder='Seconds'
										className='bg-secondary'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<FormField
					control={form.control}
					name='free'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className='flex items-center space-x-2'>
									<Checkbox
										onCheckedChange={field.onChange}
										checked={field.value}
									/>
									<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
										Are you offering this lesson for free?
									</label>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex items-center gap-2'>
					<Button type='submit'>{isEdit ? 'Edit' : 'Add'}</Button>
					{isEdit && (
						<Button variant={'destructive'} type='button' onClick={onCancel}>
							Cancel
						</Button>
					)}
				</div>
			</form>
		</Form>
	)
}
