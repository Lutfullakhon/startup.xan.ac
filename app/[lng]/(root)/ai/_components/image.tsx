import FillLoading from '@/components/shared/fill-loading'
import NoResult from '@/components/shared/no-result'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useTranslate from '@/hooks/use-translate'
import { imageSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Download, Send, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import axios from 'axios'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { amountOptions, resolutionOptions } from '@/constants'
import { Card, CardFooter } from '@/components/ui/card'
import CustomImage from '@/components/shared/custom-image'

function ImageGenerator() {
	const [photos, setPhotos] = useState<string[]>([])

	const t = useTranslate()

	const form = useForm<z.infer<typeof imageSchema>>({
		resolver: zodResolver(imageSchema),
		defaultValues: { prompt: '', amount: '1', resolution: '512x512' },
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof imageSchema>) => {
		try {
			setPhotos([])

			const response = await axios.post('/api/image', values)

			const urls = response.data.map((image: { url: string }) => image.url)
			setPhotos(urls)
		} catch {
			toast.error(t('error'))
		} finally {
			form.reset()
		}
	}

	return (
		<>
			{photos.length === 0 && (
				<div className='flex items-center justify-center'>
					<NoResult
						title={t('howCanIHelp')}
						description={t('imageDescription')}
					/>
				</div>
			)}

			{isLoading && <FillLoading />}

			{photos.length > 0 && (
				<div className='h-full px-4'>
					<div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
						{photos.map(src => (
							<Card key={src} className='overflow-hidden rounded-lg'>
								<div className='relative aspect-square'>
									<CustomImage alt='Generated' src={src} />
								</div>
								<CardFooter className='p-2'>
									<Button
										onClick={() => window.open(src)}
										variant='secondary'
										className='w-full'
									>
										<Download className='mr-2 size-4' />
										Download
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			)}

			<div className='absolute bottom-0 w-full bg-secondary p-2'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='mx-auto grid w-full max-w-4xl grid-cols-2 items-center justify-between gap-4 max-md:grid-cols-1 max-md:gap-2'
					>
						<FormField
							name='prompt'
							render={({ field }) => (
								<FormControl className='w-full'>
									<Input
										className='border-0 bg-background outline-none focus-visible:ring-0 focus-visible:ring-transparent'
										disabled={isLoading}
										placeholder={t('imagePlaceholder')}
										{...field}
									/>
								</FormControl>
							)}
						/>

						<div className='flex gap-2'>
							<FormField
								control={form.control}
								name='amount'
								render={({ field }) => (
									<FormItem className='w-full'>
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{amountOptions.map(option => (
													<SelectItem key={option.value} value={option.value}>
														<span>
															{option.value} {t(option.label)}
														</span>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='resolution'
								render={({ field }) => (
									<FormItem className='w-full'>
										<Select
											disabled={isLoading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue defaultValue={field.value} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{resolutionOptions.map(option => (
													<SelectItem key={option.value} value={option.value}>
														{option.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
							<div className='flex gap-2'>
								<Button type='submit' disabled={isLoading} size='icon'>
									<Send />
								</Button>

								<Button
									type='button'
									disabled={isLoading}
									size='icon'
									variant={'destructive'}
									onClick={() => setPhotos([])}
								>
									<X />
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</div>
		</>
	)
}

export default ImageGenerator
