'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { toast } from 'sonner'

import { courseSchema } from '@/lib/validation'
import { courseCategory, courseLanguage, courseLevels } from '@/constants'
import { createCourse } from '@/actions/course.action'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectValue,
	SelectTrigger,
} from '../ui/select'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { ImageDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

function CourseFieldsForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [open, setOpen] = useState(false)

	const router = useRouter()

	const form = useForm<z.infer<typeof courseSchema>>({
		resolver: zodResolver(courseSchema),
		defaultValues: {
			title: '',
			description: '',
			learning: '',
			requirements: '',
			level: '',
			category: '',
			language: '',
			oldPrice: '',
			currentPrice: '',
		},
	})

	async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (!file) return

		const formData = new FormData()
		formData.append('file', file)
		formData.append(
			'upload_preset',
			process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
		) // your Cloudinary upload preset

		try {
			const res = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
				{
					method: 'POST',
					body: formData,
				}
			)

			const data = await res.json()
			if (res.ok && data.secure_url) {
				setPreviewImage(data.secure_url)
				toast.success('Image uploaded successfully')
			} else {
				console.error('Upload error', data)
				throw new Error('Image upload failed')
			}
		} catch (error) {
			console.error(error)
			toast.error('Failed to upload image')
		}
	}

	const onSubmit = async (values: z.infer<typeof courseSchema>) => {
		setIsLoading(true)

		const { oldPrice, currentPrice } = values
		const promise = createCourse({
			...values,
			oldPrice: +oldPrice,
			currentPrice: +currentPrice,
			previewImage,
		})
			.then(() => {
				form.reset()
				router.push('/en/instructor/my-courses')
			})
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully created',
			error: 'Something went wrong',
		})
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					{/* Title */}
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Course Title<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='Learn ReactJS - from 0 to hero'
										disabled={isLoading}
										className='bg-secondary'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Description */}
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Short Description<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder='Description'
										disabled={isLoading}
										className='bg-secondary h-40'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Learning & Requirements */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='learning'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										What will students learn?
										<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='bg-secondary'
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='requirements'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Requirements<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='bg-secondary'
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Selects and Prices */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{[
							{ name: 'level', options: courseLevels },
							{ name: 'category', options: courseCategory },
							{ name: 'language', options: courseLanguage },
						].map(({ name, options }) => (
							<FormField
								key={name}
								control={form.control}
								name={name as keyof z.infer<typeof courseSchema>}
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{name[0].toUpperCase() + name.slice(1)}
											<span className='text-red-500'>*</span>
										</FormLabel>
										<FormControl>
											<Select
												defaultValue={field.value}
												onValueChange={field.onChange}
												disabled={isLoading}
											>
												<SelectTrigger className='w-full bg-secondary'>
													<SelectValue placeholder='Select' />
												</SelectTrigger>
												<SelectContent>
													{options.map(option => (
														<SelectItem key={option} value={option}>
															{option}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}

						<FormField
							control={form.control}
							name='oldPrice'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Old Price<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='number'
											disabled={isLoading}
											value={field.value ?? ''}
											className='bg-secondary'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='currentPrice'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Current Price<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='number'
											disabled={isLoading}
											value={field.value ?? ''}
											className='bg-secondary'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* File Upload */}
						<FormItem>
							<FormLabel>
								Preview Image<span className='text-red-500'>*</span>
							</FormLabel>
							<Input
								type='file'
								onChange={handleFileChange}
								disabled={isLoading}
								className='bg-secondary'
							/>
							<FormMessage />
						</FormItem>
					</div>

					{/* Buttons */}
					<div className='flex justify-end gap-4'>
						<Button
							type='button'
							variant='destructive'
							onClick={() => form.reset()}
							disabled={isLoading}
						>
							Clear
						</Button>
						<Button type='submit' disabled={isLoading}>
							Submit
						</Button>
						{/* Preview Image */}
						{previewImage && (
							<Button
								type='button'
								size={'lg'}
								variant={'outline'}
								onClick={() => setOpen(true)}
							>
								<span>Image</span>
								<ImageDown className='ml-2 size-4' />
							</Button>
						)}
					</div>
				</form>
			</Form>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogTitle></DialogTitle>

					{previewImage ? (
						<div className='relative h-72'>
							<Image
								src={previewImage}
								alt='Preview'
								fill
								className='rounded-md object-cover'
							/>
						</div>
					) : null}

					<Button
						className='w-fit'
						variant={'destructive'}
						onClick={() => {
							setPreviewImage('')
							setOpen(false)
						}}
					>
						Remove
					</Button>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default CourseFieldsForm
