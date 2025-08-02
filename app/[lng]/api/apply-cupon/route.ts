// app/api/apply-coupon/route.ts
import { applyCoupon } from '@/actions/payment.action'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	const { code } = await req.json()
	try {
		const result = await applyCoupon(code)
		return NextResponse.json({ valid: result.valid, percent_off: result.percent_off })
	} catch (err) {
		return NextResponse.json({ error: (err as Error).message }, { status: 500 })
	}
}
