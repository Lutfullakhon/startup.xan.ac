import openai from '@/lib/openai'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { prompt, amount = 1, resolution = '512x512' } = body

		if (!prompt) {
			return new NextResponse('Prompt is required', { status: 400 })
		}

		if (!amount) {
			return new NextResponse('Amount is required', { status: 400 })
		}

		if (!resolution) {
			return new NextResponse('Resolution is required', { status: 400 })
		}

		const response = await openai.images.generate({
			prompt,
			n: parseInt(amount, 10),
			size: resolution,
		})

		return NextResponse.json(response.data)
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 })
	}
}
