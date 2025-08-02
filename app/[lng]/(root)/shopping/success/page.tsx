import { retrievePayment } from '@/actions/payment.action'
import { SearchParamsProps } from '@/app.types'
import TopBar from '@/components/shared/top-bar'
import { Button } from '@/components/ui/button'
import { translation } from '@/i18n/server'
import { format } from 'date-fns'
import { GaugeCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props extends SearchParamsProps {
	params: { lng: string }
}
async function Page({ params, searchParams }: Props) {
	const payment = await retrievePayment(searchParams.pi!)
	const { t } = await translation(params.lng)

	return (
		<>
			<TopBar label={t('checkout')} extra={t('successfully')} />

			<div className='container mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center space-y-2'>
				<Image
					src={'/assets/success.png'}
					alt='success'
					width={200}
					height={200}
				/>

				<div className='text-center'>
					<h1 className='font-space-grotesk text-2xl font-bold'>
						{t('orderCompleted')}
					</h1>
					<p className='text-sm text-muted-foreground'>{t('thanksOrder')}</p>

					<Button className='mt-4' rounded={'full'} size={'lg'} asChild>
						<Link href={'/profile'}>
							<span>{t('dashboard')}</span>
							<GaugeCircle className='ml-1 size-4' />
						</Link>
					</Button>

					<div className='mt-4 grid w-full grid-cols-4 gap-4 rounded-lg border border-dashed border-primary p-8 max-md:grid-cols-1'>
						<div className='flex flex-col items-start'>
							<h2 className='font-space-grotesk font-bold'>{t('order')}</h2>
							<p className='text-sm font-bold text-primary'>
								#{payment.metadata.orderId}
							</p>
						</div>

						<div className='flex flex-col items-start'>
							<h2 className='font-space-grotesk font-bold'>{t('date')}</h2>
							<p className='text-sm font-bold text-primary'>
								{format(new Date(payment.created * 1000), 'dd/MM/yyyy')}
							</p>
						</div>

						<div className='flex flex-col items-start'>
							<h2 className='font-space-grotesk font-bold'>{t('totals')}</h2>
							<p className='text-sm font-bold text-primary'>
								{(payment.amount / 100).toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</p>
						</div>

						<div className='flex flex-col items-start'>
							<h2 className='font-space-grotesk font-bold'>
								{t('paymentMethod')}
							</h2>
							<p className='text-sm font-bold text-primary'>
								{typeof payment.payment_method === 'string'
									? ''
									: payment.payment_method?.card?.brand}{' '}
								****{' '}
								{typeof payment.payment_method === 'string'
									? ''
									: payment.payment_method?.card?.last4}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
