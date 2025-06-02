import { LucideIcon } from 'lucide-react'
import React from 'react'
import { IconType } from 'react-icons/lib'

interface Props {
	label: string
	value: string
	Icon: LucideIcon | IconType
}

function StatisticsCard({ Icon, label, value }: Props) {
	return (
		<div className='flex items-center justify-between rounded-md bg-background p-4'>
			<div className='flex flex-col space-y-2'>
				<p className='text-muted-foreground'>{label}</p>
				<p className='text-2xl font-bold'>{value}</p>
			</div>
			<Icon className='size-12 text-primary' />
		</div>
	)
}

export default StatisticsCard
