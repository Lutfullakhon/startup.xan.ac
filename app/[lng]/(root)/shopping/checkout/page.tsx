export const dynamic = 'force-dynamic'

import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import CheckoutElement from './_components/checkout-elements'

import { getCustomerCards } from '@/actions/customer.action'
import { auth } from '@clerk/nextjs/server'

async function Page({ params }: LngParams) {
	const { userId } = await auth()
	const { t } = await translation((await params).lng)

	const cards = await getCustomerCards(userId!)

	return (
		<>
			<TopBar label={'shoppingCart'} extra={t('checkout')} />
			<CheckoutElement cards={JSON.parse(JSON.stringify(cards))} />
		</>
	)
}

export default Page
