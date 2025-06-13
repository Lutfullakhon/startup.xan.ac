'use client'

import { updateUser } from '@/actions/user.action'
import { IUser } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { profileSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CandlestickChart, Github, Linkedin, Youtube } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function Account(user: IUser) {
	const { bio, job, website, youtube, github, linkedin, phone } = user

	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()

	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: { bio, job, website, youtube, github, linkedin, phone },
	})

	function onSubmit(values: z.infer<typeof profileSchema>) {
		setIsLoading(true)
		const promise = updateUser({
			clerkId: user.clerkId,
			updatedData: values,
			path: pathname,
		}).finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully updated!',
			error: 'Something went wrong. Please try again.',
		})
	}

	return (
		<Card className='ml-6 max-w-4xl'>
			<CardContent className='relative p-6'>
				{isLoading && <FillLoading />}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='job'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your job</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='bg-secondary'
												placeholder='e.g. Software Engineer'
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mobile phone</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='bg-secondary'
												placeholder='e.g. +1 123 456 7890'
												type='number'
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='website'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website</FormLabel>
										<FormControl>
											<div className='flex items-center bg-secondary pr-2'>
												<Input
													{...field}
													className='bg-secondary'
													disabled={isLoading}
													placeholder='e.g. www.example.com'
												/>
												<CandlestickChart className='ml-2 text-muted-foreground' />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='github'
								render={({ field }) => (
									<FormItem>
										<FormLabel>GitHub</FormLabel>
										<FormControl>
											<div className='flex items-center bg-secondary pr-2'>
												<Input
													{...field}
													className='bg-secondary'
													disabled={isLoading}
													placeholder='e.g. www.github.com'
												/>
												<Github className='text-muted-foreground' />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='linkedin'
								render={({ field }) => (
									<FormItem>
										<FormLabel>LinkedIn</FormLabel>
										<FormControl>
											<div className='flex items-center bg-secondary pr-2'>
												<Input
													{...field}
													className='bg-secondary'
													disabled={isLoading}
													placeholder='e.g. www.linkedin.com'
												/>
												<Linkedin className='text-muted-foreground' />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='youtube'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Yuutube</FormLabel>
										<FormControl>
											<div className='flex items-center bg-secondary pr-2'>
												<Input
													{...field}
													className='bg-secondary'
													disabled={isLoading}
													placeholder='e.g. www.linkedin.com'
												/>
												<Youtube className='text-muted-foreground' />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='bio'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='bg-secondary'
											disabled={isLoading}
											placeholder='e.g. It is not a typo, it is a joke!'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>Save</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default Account
