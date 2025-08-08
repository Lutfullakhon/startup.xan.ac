import openai from '@/lib/openai'
import { NextResponse } from 'next/server'

const instruction = {
	role: 'system',
	content:
		'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
}

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { messages } = body

		if (!messages) {
			return new NextResponse('Messages are required', { status: 400 })
		}

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [instruction, ...messages],
		})

		return NextResponse.json(response.choices[0].message.content)
	} catch (error) {
		return new NextResponse('Internal Error', { status: 500 })
	}
}
