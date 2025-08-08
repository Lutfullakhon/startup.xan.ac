import { IMessage } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import NoResult from '@/components/shared/no-result'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useTranslate from '@/hooks/use-translate'
import { prompSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bot, Send, User, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import axios from 'axios'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'

function Code() {
	const [messages, setMessages] = useState<IMessage[]>([])

	const t = useTranslate()

	const form = useForm<z.infer<typeof prompSchema>>({
		resolver: zodResolver(prompSchema),
		defaultValues: { prompt: '' },
	})

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof prompSchema>) => {
		try {
			const userMessage = {
				role: 'user',
				content: values.prompt,
			}
			const response = await axios.post('/api/code', {
				messages: [...messages, userMessage],
			})
			setMessages(prev => [
				...prev,
				userMessage,
				{ role: 'system', content: response.data },
			])
			form.reset()
		} catch {
			toast.error(t('error'))
		} finally {
			form.reset()
		}
	}

	return (
		<>
			{messages.length === 0 && (
				<div className='flex items-center justify-center'>
					<NoResult
						title={t('howCanIHelp')}
						description={t('codeDescription')}
					/>
				</div>
			)}

			{isLoading && <FillLoading />}

			{messages.length > 0 && (
				<div className='mx-auto flex h-full max-w-4xl flex-col gap-y-4 p-4'>
					{messages.map(item => (
						<div
							key={item.content}
							className={cn(
								'p-4 w-full gap-x-4 rounded-md flex',
								item.role === 'user' ? 'bg-primary' : 'bg-background'
							)}
						>
							<div>{item.role === 'user' ? <User /> : <Bot />}</div>
							<div className='overflow-hidden text-sm leading-7'>
								<ReactMarkdown
									components={{
										pre: ({ node, ...props }) => (
											<div className='my-2 w-full overflow-auto rounded-lg bg-secondary p-2'>
												<pre {...props} />
											</div>
										),
										code: ({ node, ...props }) => (
											<code
												className='rounded-lg bg-secondary p-1'
												{...props}
											/>
										),
									}}
								>
									{item.content || ''}
								</ReactMarkdown>
							</div>
						</div>
					))}
				</div>
			)}

			<div className='absolute bottom-0 w-full bg-secondary p-2'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='mx-auto flex w-full max-w-4xl items-center justify-between gap-4'
					>
						<FormField
							name='prompt'
							render={({ field }) => (
								<FormControl className='w-full'>
									<Input
										className='border-0 bg-background outline-none focus-visible:ring-0 focus-visible:ring-transparent'
										disabled={isLoading}
										placeholder={t('codePlaceholder')}
										{...field}
									/>
								</FormControl>
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
								onClick={() => setMessages([])}
							>
								<X />
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	)
}

export default Code
