'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { Edit2, X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { ICourse } from '@/app.types'
import { updateCourse } from '@/actions/course.action'
import useToggleEdit from '@/hooks/use-toggle-edit'
import FillLoading from '@/components/shared/fill-loading'

function PreviewImage(course: ICourse) {
	const { state, onToggle } = useToggleEdit()
	const [preview, setPreview] = useState(course.previewImage)

	return (
		<Card>
			<CardContent className='relative p-6'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Replace image</span>
					<Button size='icon' variant='ghost' onClick={onToggle}>
						{state ? <X /> : <Edit2 className='size-5' />}
					</Button>
				</div>
				<Separator className='my-3' />

				{state ? (
					<Form course={course} setPreview={setPreview} onToggle={onToggle} />
				) : (
					<div className='relative h-72 w-full'>
						<Image
							src={preview}
							alt={course.title}
							fill
							className='rounded-sm object-cover'
						/>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default PreviewImage

interface FormProps {
	course: ICourse
	onToggle: () => void
	setPreview: (url: string) => void
}

function Form({ course, onToggle, setPreview }: FormProps) {
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()

	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const formData = new FormData()
		formData.append('file', file)
		formData.append(
			'upload_preset',
			process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
		)

		setIsLoading(true)

		const promise = fetch(
			`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
			{
				method: 'POST',
				body: formData,
			}
		)
			.then(async res => {
				const data = await res.json()
				if (res.ok && data.secure_url) {
					await updateCourse(
						course._id,
						{ previewImage: data.secure_url },
						pathname
					)
					setPreview(data.secure_url)
					onToggle()
				} else {
					throw new Error(data.error?.message || 'Cloudinary upload failed')
				}
			})
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Uploading...',
			success: 'Image updated successfully!',
			error: 'Image update failed.',
		})
	}

	return (
		<>
			{isLoading && <FillLoading />}
			<Input
				type='file'
				accept='image/*'
				onChange={handleUpload}
				disabled={isLoading}
				className='bg-secondary'
			/>
		</>
	)
}
