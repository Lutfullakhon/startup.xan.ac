'use client'

import { IUser } from '@/app.types'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { GiWorld } from 'react-icons/gi'

function SocialMedia({ user }: { user: IUser }) {
	return (
		<div className='flex gap-2'>
			<Button
				size={'sm'}
				className='font-space-grotesk'
				variant={'secondary'}
				onClick={() => window.open(user.github, '_blank')}
			>
				<FaGithub className='size-4' />
				<span className='ml-1'>GitHub</span>
			</Button>

			<Button
				size={'sm'}
				variant={'secondary'}
				className='font-space-grotesk'
				onClick={() => window.open(user.linkedin, '_blank')}
			>
				<FaLinkedin className='size-4' />
				<span className='ml-1'>LinkedIn</span>
			</Button>

			<Button
				size={'sm'}
				variant={'secondary'}
				className='font-space-grotesk'
				onClick={() => window.open(user.youtube, '_blank')}
			>
				<FaYoutube className='size-4' />
				<span className='ml-1'>YouTube</span>
			</Button>

			<Button
				size={'sm'}
				variant={'secondary'}
				className='font-space-grotesk'
				onClick={() => window.open(user.website, '_blank')}
			>
				<GiWorld className='size-4' />
				<span className='ml-1'>Website</span>
			</Button>
		</div>
	)
}

export default SocialMedia
