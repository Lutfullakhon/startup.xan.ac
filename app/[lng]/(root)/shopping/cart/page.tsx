'use client'

import { Suspense } from 'react' // Add Suspense
import NoResult from '@/components/shared/no-result'
import TopBar from '@/components/shared/top-bar'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/hooks/use-cart'
import useTranslate from '@/hooks/use-translate'
import ShoppingCartCard from './_components/shopping-cart-card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Wrap your cart content in a separate component
function CartContent() {
	const { carts, totalPrice, taxes } = useCart()
	const t = useTranslate()

	return (
		<>
			<TopBar label='checkout' extra='shoppingCart' />

			<div className='container mx-auto mt-12 max-w-6xl'>
				<div className='grid grid-cols-3 gap-2 max-md:grid-cols-1'>
					<Card className='col-span-2 bg-gradient-to-t from-secondary to-background'>
						<CardContent className='py-4'>
							{carts.length > 0 && (
								<>
									<h1 className='font-space-grotesk text-2xl font-bold'>
										{t('shoppingCart')}
									</h1>
									<p className='text-sm text-muted-foreground'>
										{t('youHave')} {carts.length} {t('itemsInCart')}
									</p>
								</>
							)}

							{carts.length === 0 && (
								<NoResult
									title={t('cartEmpty')}
									description={t('cartDescription')}
								/>
							)}

							<div className='my-3 flex flex-col space-y-3'>
								{carts.map(cart => (
									<ShoppingCartCard key={cart._id} {...cart} />
								))}
							</div>
						</CardContent>
					</Card>

					<div>
						<Card className='bg-gradient-to-t from-secondary to-background'>
							<CardContent className='py-4'>
								<h1 className='font-space-grotesk text-2xl font-bold'>
									{t('results')}
								</h1>
								<p className='text-sm text-muted-foreground'>
									{t('controlsResult')}
								</p>

								<Separator className='my-3' />

								<div className='flex items-center justify-between text-sm'>
									<div className='font-space-grotesk font-bold'>
										{t('subtotal')}
									</div>
									<div className='font-medium'>
										{totalPrice().toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</div>
								</div>

								<div className='flex items-center justify-between text-sm'>
									<div className='font-space-grotesk font-bold'>
										{t('taxes')}
									</div>
									<div className='font-medium'>
										{taxes().toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</div>
								</div>

								<div className='flex items-center justify-between text-sm'>
									<div className='font-space-grotesk font-bold'>
										{t('total')}
									</div>
									<div className='font-medium'>
										{(totalPrice() + taxes()).toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
										})}
									</div>
								</div>

								{carts.length ? (
									<Button
										asChild
										className='group mt-3 flex w-full items-center justify-between px-2 font-space-grotesk font-bold'
										size={'lg'}
									>
										<Link href={'/shopping/checkout'}>
											<span>
												{(totalPrice() + taxes()).toLocaleString('en-US', {
													style: 'currency',
													currency: 'USD',
												})}
											</span>
											<div className='flex items-center gap-1 opacity-50 transition-all group-hover:opacity-100'>
												<span>{t('checkout')}</span>
												<ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
											</div>
										</Link>
									</Button>
								) : null}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	)
}

function Page() {
	return (
		<Suspense
			fallback={
				<div className='flex h-screen w-full items-center justify-center'>
					<div className='h-12 w-12 animate-spin rounded-full border-t-2 border-primary'></div>
				</div>
			}
		>
			<CartContent />
		</Suspense>
	)
}

export default Page
