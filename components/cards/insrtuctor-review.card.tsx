'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Flag } from 'lucide-react'
import { Avatar } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import ReactStars from '@/components/react-stars-client'

function InsrtuctorReviewCard() {
	return (
		<div className='flex gap-4 border-b pb-4'>
			<div className='flex-1'>
				<div className='flex gap-3'>
					<Avatar>
						<AvatarFallback className='uppercase'>sb</AvatarFallback>
					</Avatar>

					<div className='flex flex-col'>
						<div className='font-space-grotesk text-sm'>
							Anvarov Lutfullakhon
							<span className='text-sm text-muted-foreground'> 3 days ago</span>
						</div>
						<ReactStars value={4.7} edit={false} color2='#E59819' />
						<div className='font-space-grotesk font-bold'>
							Full course reactjs
						</div>
						<p className='text-sm text-muted-foreground'>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure qui
							expedita mollitia pariatur repudiandae exercitationem! Facilis
							reiciendis eius natus minima error sunt quod saepe ullam?
						</p>
					</div>
				</div>
			</div>
			<Button size={'icon'} variant={'ghost'} className='self-start'>
				<Flag className='text-muted-foreground' />
			</Button>
		</div>
	)
}

export default InsrtuctorReviewCard
