import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import CheckoutElement from './_components/checkout-elements'

async function Page({ params }: LngParams) {
	const { t } = await translation((await params).lng)

	return (
		<>
			<TopBar label={'shoppingCart'} extra={t('checkout')} />
			<CheckoutElement />
		</>
	)
}

export default Page
