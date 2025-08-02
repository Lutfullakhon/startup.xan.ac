'use client'

import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
} from '@stripe/react-stripe-js'
import { useTheme } from 'next-themes'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { addressSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Input } from '../ui/input'
import useTranslate from '@/hooks/use-translate'
import { Button } from '../ui/button'
import { useCart } from '@/hooks/use-cart'
import { ArrowRight } from 'lucide-react'

interface Props {
	onHandler: (
		values: z.infer<typeof addressSchema>
	) => Promise<null | undefined>
	isProfile?: boolean
}
function PaymentForm({ onHandler, isProfile }: Props) {
	const [loading, setLoading] = useState(false)

	const { resolvedTheme } = useTheme()
	const { totalPrice, taxes } = useCart()
	const t = useTranslate()

	const cardStyles = {
		base: {
			color: resolvedTheme === 'light' ? '#000' : '#fff',
			fontSmoothing: 'antialiased',
			fontSize: '16px',
			'::placeholder': {
				color:
					resolvedTheme === 'light' ? 'rgba(0,0,0,.5)' : 'rgba(255,255,255,.4)',
				opacity: '0.7',
			},
		},
		ivalid: {
			color: '#fa755a',
			iconColor: '#fa755a',
		},
	}

	const form = useForm<z.infer<typeof addressSchema>>({
		resolver: zodResolver(addressSchema),
		defaultValues: {},
	})

	const onSubmit = async (values: z.infer<typeof addressSchema>) => {
		setLoading(true)
		onHandler(values).finally(() => setLoading(false))
	}

	return (
		<>
			<div className='mt-4 flex gap-2'>
				<div className='w-[60%] rounded-md border bg-secondary px-2 py-3'>
					<CardNumberElement
						options={{
							style: cardStyles,
							placeholder: 'XXXX XXXX XXXX XXXX',
							showIcon: true,
						}}
					/>
				</div>

				<div className='w-[20%] rounded-md border bg-secondary px-2 py-3'>
					<CardExpiryElement options={{ style: cardStyles }} />
				</div>

				<div className='w-[20%] rounded-md border bg-secondary px-2 py-3'>
					<CardCvcElement
						options={{
							style: cardStyles,
							placeholder: 'CVC',
						}}
					/>
				</div>
			</div>

			<div className='mt-2'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
						<FormField
							control={form.control}
							name='fullName'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className='h-11 bg-secondary'
											placeholder={t('fullName')}
											disabled={loading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											className='h-11 bg-secondary'
											placeholder={t('address')}
											disabled={loading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-2 gap-2'>
							<FormField
								control={form.control}
								name='city'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className='h-11 bg-secondary'
												placeholder={t('city')}
												disabled={loading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='zip'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												className='h-11 bg-secondary'
												placeholder={t('zipCode')}
												disabled={loading}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<Button
							className='group h-11 max-md:w-full'
							type='submit'
							disabled={loading}
						>
							{isProfile ? (
								<span>{t('submit')}</span>
							) : (
								<span>
									{t('payNow')}{' '}
									{(totalPrice() + taxes()).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</span>
							)}
							<ArrowRight className='ml-1 size-4 transition-transform group-hover:translate-x-1' />
						</Button>
					</form>
				</Form>
			</div>
		</>
	)
}

export default PaymentForm
