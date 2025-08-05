import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useTranslate from '@/hooks/use-translate'
import { socialMediaSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface Props {
	onHandler: (values: z.infer<typeof socialMediaSchema>) => Promise<void>
}
function SecondForm({ onHandler }: Props) {
	const t = useTranslate()

	const form = useForm<z.infer<typeof socialMediaSchema>>({
		resolver: zodResolver(socialMediaSchema),
		defaultValues: {},
	})

	const onSubmit = (values: z.infer<typeof socialMediaSchema>) => {
		const promise = onHandler(values)

		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: t('error'),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='mt-4 space-y-3'>
				<FormField
					control={form.control}
					name='website'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								{t('portfolioWebsite')} <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-primary/10'
									placeholder='https://sammi.ac'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='linkedin'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								LinkedIn <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-primary/10'
									placeholder='https://linkedin.com/in/sammi'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='github'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Github <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-primary/10'
									placeholder='https://github.com/sammi'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='youtube'
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Youtube <span className='text-red-500'>*</span>
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-primary/10'
									placeholder='https://youtube.com/samarbadriddinov'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button className='w-fit' type='submit' size={'sm'}>
					<span>{t('nextStep')}</span>
				</Button>
			</form>
		</Form>
	)
}

export default SecondForm
