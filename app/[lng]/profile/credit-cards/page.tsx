import { getCustomerCards, getPaymentIntents } from '@/actions/customer.action'
import { IPayment } from '@/app.types'
import Header from '@/components/shared/header'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { format } from 'date-fns'
import CreditCard from './_components/credit.card'
import AddPaymentMethod from './_components/add-payment-method'

async function Page({ params }: LngParams) {
	const { userId } = await auth()
	const { t } = await translation((await params).lng)

	const cards = await getCustomerCards(userId!)
	const payments = await getPaymentIntents(userId!)
	const data: IPayment[] = JSON.parse(JSON.stringify(payments))

	return (
		<>
			<Header
				title={t('creditCards')}
				description={t('creditCardsDescription')}
			/>

			<div className='grid grid-cols-3 gap-4 max-md:grid-cols-1'>
				<div className='mt-4 flex flex-col space-y-2 p-4'>
					{cards.map(card => (
						<CreditCard key={card.id} card={JSON.parse(JSON.stringify(card))} />
					))}
					<AddPaymentMethod />
				</div>

				<div className='col-span-2 mt-4 flex flex-col space-y-2 p-4'>
					<Table>
						<TableHeader>
							<TableRow className='bg-secondary'>
								<TableHead className='w-[100px]'>{t('invoice')}</TableHead>
								<TableHead>{t('status')}</TableHead>
								<TableHead>{t('paymentMethod')}</TableHead>
								<TableHead>{t('date')}</TableHead>
								<TableHead className='text-right'>{t('amount')}</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map(payment => (
								<TableRow key={payment.id}>
									<TableCell className='font-medium'>
										#{payment.metadata.orderId}
									</TableCell>
									<TableCell className='capitalize'>{payment.status}</TableCell>
									<TableCell>
										{payment.payment_method.card.brand}{' '}
										{payment.payment_method?.card?.last4}
									</TableCell>
									<TableCell>
										{format(new Date(payment.created * 1000), 'dd/MM/yyyy')}
									</TableCell>
									<TableCell className='text-right'>
										{(payment.amount / 100).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={4}>{t('totals')}</TableCell>
								<TableCell className='text-right'>
									{(
										payments.reduce((acc, payment) => acc + payment.amount, 0) /
										100
									).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</div>
		</>
	)
}

export default Page
